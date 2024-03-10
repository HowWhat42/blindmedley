export interface Playlist {
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
  creator: Creator
  type: string
  tracks: Tracks
}

export interface Creator {
  id: number
  name: string
  tracklist: string
  type: CreatorType
  link?: string
}

export enum CreatorType {
  Artist = 'artist',
  User = 'user',
}

export interface Tracks {
  data: Track[]
  checksum: string
}

export interface Track {
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
  contributors: Artist[]
  md5_image: string
  artist: Artist
  album: Album
  type: string
}

export interface Album {
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

export interface Artist {
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
  data: Track[]
  total: number
  next: string
}

export default class DeezerService {
  async getPlaylist(playlistId: string): Promise<Playlist> {
    return fetch(`https://api.deezer.com/playlist/${playlistId}`).then((res) =>
      res.json()
    ) as Promise<Playlist>
  }

  async getTrack(trackId: string): Promise<Track> {
    return fetch(`https://api.deezer.com/track/${trackId}`).then((res) =>
      res.json()
    ) as Promise<Track>
  }

  async getArtist(artistId: string): Promise<Artist> {
    return fetch(`https://api.deezer.com/artist/${artistId}`).then((res) =>
      res.json()
    ) as Promise<Artist>
  }

  async searchTrack(query: string): Promise<SearchTrack> {
    return fetch(`https://api.deezer.com/search?q=track:"${query}"`).then((res) =>
      res.json()
    ) as Promise<SearchTrack>
  }
}
