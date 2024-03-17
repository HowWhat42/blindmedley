import { DateTime } from 'luxon'

import Token from '#models/token'
import env from '#start/env'

import { Artist, MusicService, Playlist, SearchResult, Track } from './music_service.js'

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

  async setAccessToken(accessToken: string, refreshToken: string, expiresIn: number) {
    const token = await Token.query().where('name', 'spotify').first()

    if (token) {
      token.accessToken = accessToken
      token.refreshToken = refreshToken
      token.expiresAt = DateTime.local().plus({ seconds: expiresIn })
      await token.save()
    } else {
      await Token.create({
        name: 'spotify',
        accessToken: accessToken,
        refreshToken: refreshToken,
        expiresAt: DateTime.local().plus({ seconds: expiresIn }),
      })
    }
  }

  async refreshAccessToken() {
    const token = await Token.query().where('name', 'spotify').first()

    if (!token) {
      throw new Error('Token not found')
    }

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken,
        client_id: env.get('SPOTIFY_CLIENT_ID'),
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to refresh token')
    }

    const data = (await response.json()) as {
      access_token: string
      expires_in: number
      refresh_token: string
    }
    await this.setAccessToken(data.access_token, data.refresh_token, data.expires_in)
  }

  async getPlaylist(playlistId: string): Promise<Playlist> {
    const accessToken = await this.getAccessToken()
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch playlist')
    }

    const data = (await response.json()) as SpotifyPlaylist

    const noPreviewTracks = data.tracks.items.filter((item) => !item.track.preview_url)

    const filteredTracks = data.tracks.items.filter((item) => item.track.preview_url)

    return {
      id: data.id,
      title: data.name,
      tracks: filteredTracks.map((item) => ({
        id: item.track.id,
        title: item.track.name,
        artist: item.track.artists[0].name,
        preview_url: item.track.preview_url!,
      })),
      noPreviewTracks: noPreviewTracks.map((item) => ({
        id: item.track.id,
        title: item.track.name,
        artist: item.track.artists[0].name,
      })),
    }
  }

  async getTrack(trackId: string): Promise<Track> {
    const accessToken = await this.getAccessToken()
    const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch track')
    }

    const data = (await response.json()) as SpotifyTrack

    if (!data.preview_url) {
      throw new Error('Preview not available')
    }

    return {
      id: data.id,
      title: data.name,
      artist: data.artists[0].name,
      preview_url: data.preview_url,
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

  async search(query: string): Promise<SearchResult> {
    const accessToken = await this.getAccessToken()
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to search')
    }

    const data = (await response.json()) as {
      tracks: {
        items: SpotifyTrack[]
      }
    }

    const filteredTracks = data.tracks.items.filter((track) => track.preview_url)

    return {
      tracks: filteredTracks.map((track) => ({
        id: track.id,
        title: track.name,
        artist: track.artists[0].name,
        preview_url: track.preview_url!,
      })),
    }
  }
}
