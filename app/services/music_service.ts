export interface Track {
  id: string
  title: string
  artist: string
  release_date: string
  preview_url: string
  provider: string
  track_url: string
}

export interface Artist {
  id: string
  name: string
}

export interface Playlist {
  id: string
  title: string
  tracks: Track[]
  noPreviewTracks?: Omit<Track, 'preview_url'>[]
}

export interface SearchResult {
  tracks: Track[]
}

export abstract class MusicService {
  abstract getPlaylist(playlistId: string): Promise<Playlist>
  abstract getTrack(trackId: string): Promise<Track>
  abstract getArtist(artistId: string): Promise<Artist>
  abstract search(query: string): Promise<SearchResult>
}
