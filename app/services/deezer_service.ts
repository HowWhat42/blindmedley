import { Artist, MusicService, Playlist, SearchResult, Track } from './music_service.js'

export interface DeezerPlaylist {
  id: number
  title: string
  description: string
  duration: number
  public: boolean
  is_loved_track: boolean
  collaborative: boolean
  nb_tracks: number
  fans: number
  link: string
  share: string
  picture: string
  picture_small: string
  picture_medium: string
  picture_big: string
  picture_xl: string
  checksum: string
  tracklist: string
  creation_date: string
  md5_image: string
  picture_type: string
  creator: DeezerCreator
  type: string
  tracks: { data: DeezerTrack[] }
}

export interface DeezerCreator {
  id: number
  name: string
  tracklist: string
  link?: string
}

export interface DeezerTrack {
  id: number
  readable: boolean
  title: string
  title_short: string
  title_version: string
  isrc: string
  link: string
  share: string
  duration: number
  track_position: number
  disk_number: number
  rank: number
  release_date: string
  explicit_lyrics: boolean
  explicit_content_lyrics: number
  explicit_content_cover: number
  preview: string
  bpm: number
  gain: number
  available_countries: string[]
  contributors: DeezerArtist[]
  md5_image: string
  artist: DeezerArtist
  album: DeezerAlbum
  type: string
}

export interface DeezerAlbum {
  id: number
  title: string
  link: string
  cover: string
  cover_small: string
  cover_medium: string
  cover_big: string
  cover_xl: string
  md5_image: string
  release_date: string
  tracklist: string
  type: string
}

export interface DeezerArtist {
  id: number
  name: string
  link: string
  share: string
  picture: string
  picture_small: string
  picture_medium: string
  picture_big: string
  picture_xl: string
  radio: boolean
  tracklist: string
  type: string
  role?: string
}

export interface SearchTrack {
  data: DeezerTrack[]
  total: number
  next: string
}

export default class DeezerService extends MusicService {
  async getPlaylist(playlistId: string): Promise<Playlist> {
    const playlist = await fetch(`https://api.deezer.com/playlist/${playlistId}`).then(
      (res) => res.json() as Promise<DeezerPlaylist>
    )

    return {
      id: playlist.id.toString(),
      title: playlist.title,
      tracks: playlist.tracks.data.map((track) => ({
        id: track.id.toString(),
        title: track.title,
        artist: track.artist.name,
        preview_url: track.preview,
      })),
    }
  }

  async getTrack(trackId: string): Promise<Track> {
    const track = await fetch(`https://api.deezer.com/track/${trackId}`).then(
      (res) => res.json() as Promise<DeezerTrack>
    )

    return {
      id: track.id.toString(),
      title: track.title,
      artist: track.artist.name,
      preview_url: track.preview,
    }
  }

  async getArtist(artistId: string): Promise<Artist> {
    const artist = await fetch(`https://api.deezer.com/artist/${artistId}`).then(
      (res) => res.json() as Promise<DeezerArtist>
    )

    return {
      id: artist.id.toString(),
      name: artist.name,
    }
  }

  async search(query: string): Promise<SearchResult> {
    const searchResult = await fetch(`https://api.deezer.com/search?q=track:"${query}"`).then(
      (res) => res.json() as Promise<SearchTrack>
    )

    return {
      tracks: searchResult.data.map((track) => ({
        id: track.id.toString(),
        title: track.title,
        artist: track.artist.name,
        preview_url: track.preview,
      })),
      artists: [],
      playlists: [],
    }
  }
}
