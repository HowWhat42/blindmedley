export interface ITrack {
  id: string
  title: string
  artist: string
  release_date: string
  preview_url: string
  provider: string
  provider_id: string
  track_url: string
  album?: string
}

export interface Artist {
  id: string
  name: string
}

export interface Playlist {
  id: string
  title: string
  tracks: ITrack[]
  noPreviewTracks?: Omit<ITrack, 'preview_url'>[]
}

export interface SearchResult {
  tracks: ITrack[]
}

export abstract class MusicService {
  abstract getPlaylist(playlistId: string): Promise<Playlist>
  abstract getTrack(trackId: string): Promise<ITrack>
  abstract getArtist(artistId: string): Promise<Artist>
  abstract search(title: string, artist?: string): Promise<SearchResult>
}
