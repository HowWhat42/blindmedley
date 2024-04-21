import { create } from 'zustand'

interface AudioPlayerState {
  audio: HTMLAudioElement
  trackId: string | null
  playing: boolean
  volume: number
  setUrl: (url: string, id: string) => void
  togglePlay: () => void
  setVolume: (volume: number) => void
}

const useAudioPlayerStore = create<AudioPlayerState>((set) => ({
  audio: new Audio(),
  trackId: null,
  playing: false,
  volume: 0.5,
  setUrl: (url, id) => {
    set((state) => {
      const { audio } = state
      if (audio.src !== url) {
        audio.pause()
        audio.currentTime = 0
      }
      audio.src = url
      return { audio, trackId: id, playing: false }
    })
  },
  togglePlay: () => {
    set((state) => {
      const { audio, playing } = state
      if (playing) {
        audio.pause()
      } else {
        audio.play()
      }
      return { playing: !playing }
    })
  },
  setVolume: (volume) => {
    set((state) => {
      const { audio } = state
      audio.volume = volume
      return { volume }
    })
  },
}))

export default useAudioPlayerStore
