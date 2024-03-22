import { DateTime } from 'luxon'

import Token from '#models/token'
import env from '#start/env'

import { Artist, ITrack, MusicService, Playlist, SearchResult } from './music_service.js'

interface SpotifyTrack {
  album: SpotifyAlbum
  artists: SpotifyArtist[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_urls: ExternalUrls
  href: string
  id: string
  is_playable: boolean
  name: string
  popularity: number
  preview_url?: string
  track_number: number
  type: string
  uri: string
  is_local: boolean
}

interface SpotifyAlbum {
  album_type: string
  total_tracks: number
  available_markets: string[]
  external_urls: ExternalUrls
  href: string
  id: string
  images: Image[]
  name: string
  release_date: string
  release_date_precision: string
  type: string
  uri: string
}

interface ExternalUrls {
  spotify: string
}

interface Image {
  url: string
  height: number
  width: number
}

interface SpotifyArtist {
  external_urls: ExternalUrls
  genres: string[]
  href: string
  id: string
  images: Image[]
  name: string
  popularity: number
  type: string
  uri: string
}

interface SpotifyPlaylist {
  collaborative: boolean
  description: string
  external_urls: ExternalUrls
  href: string
  id: string
  images: Image[]
  name: string
  owner: Owner
  public: boolean
  snapshot_id: string
  tracks: Tracks
  type: string
  uri: string
}

interface Owner {
  external_urls: ExternalUrls
  href: string
  id: string
  type: string
  uri: string
  display_name?: string
  name?: string
}

interface Tracks {
  href: string
  limit: number
  next: string
  offset: number
  previous: string
  total: number
  items: Item[]
}

interface Item {
  added_at: string
  added_by: Owner
  is_local: boolean
  track: SpotifyTrack
}

export default class SpotifyService extends MusicService {
  private static instance: SpotifyService

  static getInstance(): SpotifyService {
    if (!SpotifyService.instance) {
      SpotifyService.instance = new SpotifyService()
    }
    return SpotifyService.instance
  }

  async getAccessToken(): Promise<string> {
    const token = await Token.query().where('name', 'spotify').first()

    if (!token) {
      throw new Error('Token not found')
    }

    if (token.expiresAt < DateTime.local()) {
      await this.refreshAccessToken()
      return this.getAccessToken()
    }

    return token.accessToken
  }

  async setAccessToken(accessToken: string, expiresIn: number) {
    const token = await Token.query().where('name', 'spotify').first()

    if (token) {
      token.accessToken = accessToken
      token.expiresAt = DateTime.local().plus({ seconds: expiresIn })
      await token.save()
    } else {
      await Token.create({
        name: 'spotify',
        accessToken: accessToken,
        expiresAt: DateTime.local().plus({ seconds: expiresIn }),
      })
    }
  }

  async refreshAccessToken() {
    const token = await Token.query().where('name', 'spotify').first()
    const SPOTIFY_CLIENT_ID = env.get('SPOTIFY_CLIENT_ID')
    const SPOTIFY_CLIENT_SECRET = env.get('SPOTIFY_CLIENT_SECRET')

    if (!token) {
      throw new Error('Token not found')
    }

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(
          `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
        ).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to refresh token')
    }

    const data = (await response.json()) as {
      access_token: string
      expires_in: number
    }
    await this.setAccessToken(data.access_token, data.expires_in)
  }

  async getPlaylist(playlistId: string): Promise<Playlist> {
    const accessToken = await this.getAccessToken()
    const playlist = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => res.json() as Promise<SpotifyPlaylist>)

    let nextPage = playlist.tracks.next
    let tracks = playlist.tracks.items

    while (nextPage) {
      const nextTracks = await fetch(nextPage, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((res) => res.json() as Promise<Tracks>)
      nextPage = nextTracks.next

      tracks = tracks.concat(nextTracks.items)
    }

    const noPreviewTracks = tracks.filter(
      (item) =>
        !item.track.preview_url ||
        !item.track.album.release_date ||
        !item.track.name ||
        !item.track.artists[0].name
    )

    const filteredTracks = tracks.filter(
      (item) =>
        item.track.preview_url &&
        item.track.album.release_date &&
        item.track.name &&
        item.track.artists[0].name
    )

    return {
      id: playlist.id,
      title: playlist.name,
      tracks: filteredTracks.map((item) => ({
        id: item.track.id,
        title: item.track.name,
        artist: item.track.artists[0].name,
        release_date: new Date(item.track.album.release_date).getFullYear().toString(),
        preview_url: item.track.preview_url!,
        provider: 'spotify',
        provider_id: item.track.id,
        track_url: item.track.external_urls.spotify,
        album: item.track.album.name,
      })),
      noPreviewTracks: noPreviewTracks.map((item) => ({
        id: item.track.id,
        title: item.track.name,
        artist: item.track.artists[0].name,
        release_date: new Date(item.track.album.release_date).getFullYear().toString(),
        provider: 'spotify',
        provider_id: item.track.id,
        track_url: item.track.external_urls.spotify,
        album: item.track.album.name,
      })),
    }
  }

  async getTrack(trackId: string): Promise<ITrack> {
    const accessToken = await this.getAccessToken()
    const track = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => res.json() as Promise<SpotifyTrack>)

    if (!track.preview_url) {
      throw new Error('Preview not available')
    }

    return {
      id: track.id,
      title: track.name,
      artist: track.artists[0].name,
      release_date: new Date(track.album.release_date).getFullYear().toString(),
      preview_url: track.preview_url,
      provider: 'spotify',
      provider_id: track.id,
      track_url: track.external_urls.spotify,
    }
  }

  async getArtist(artistId: string): Promise<Artist> {
    const accessToken = await this.getAccessToken()
    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch artist')
    }

    const data = (await response.json()) as SpotifyArtist

    return {
      id: data.id,
      name: data.name,
    }
  }

  async search(title: string, artist: string): Promise<SearchResult> {
    const accessToken = await this.getAccessToken()
    const searchResult = await fetch(
      `https://api.spotify.com/v1/search?q=track:${title}artist:${artist}&type=track`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((res) => res.json() as Promise<{ tracks: { items: SpotifyTrack[] } }>)

    const filteredTracks = searchResult.tracks.items.filter((track) => track.preview_url)

    return {
      tracks: filteredTracks.map((track) => ({
        id: track.id,
        title: track.name,
        artist: track.artists[0].name,
        release_date: new Date(track.album.release_date).getFullYear().toString(),
        preview_url: track.preview_url!,
        provider: 'spotify',
        provider_id: track.id,
        track_url: track.external_urls.spotify,
        album: track.album.name,
      })),
    }
  }
}
