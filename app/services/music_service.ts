export interface Track {
  id: string
  title: string
  artist: string
  preview_url: string
}

export interface Artist {
  id: string
  name: string
}

export interface Playlist {
  id: string
  title: string
  tracks: Track[]
}

export interface SearchResult {
  tracks: Track[]
  artists: Artist[]
  playlists: Playlist[]
}

export abstract class MusicService {
  abstract getPlaylist(playlistId: string): Promise<Playlist>
  abstract getTrack(trackId: string): Promise<Track>
  abstract getArtist(artistId: string): Promise<Artist>
  abstract search(query: string): Promise<SearchResult>
}
