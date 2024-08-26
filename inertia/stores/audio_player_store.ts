import { create } from 'zustand'

interface AudioPlayerState {
  audio: HTMLAudioElement
  playing: boolean
  volume: number
  setUrl: (url: string) => void
  togglePlay: () => void
  setVolume: (volume: number) => void
}

const useAudioPlayerStore = create<AudioPlayerState>((set) => ({
  audio: new Audio(),
  playing: false,
  volume: 0.5,
  setUrl: (url) => {
    set((state) => {
      const { audio } = state
      audio.pause()
      audio.currentTime = 0
      audio.src = url

      audio.load()

      return { audio, playing: true }
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
