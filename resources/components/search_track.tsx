import { PauseIcon, PlayIcon } from 'lucide-react'
import React from 'react'

import useAudioPlayerStore from '#resources/stores/audio_player_store'

import { Button } from './ui/button'

const SearchTrack = ({ track }) => {
  const { trackId, audio, playing, togglePlay, setUrl } = useAudioPlayerStore()
  const handlePlay = () => {
    if (audio.src !== track.previewUrl) {
      setUrl(track.previewUrl, track.id)
    }

    togglePlay()
  }
  return (
    <div className="flex gap-3">
      <a href={track.previewUrl} target="_blank" rel="noreferrer">
        <Button size="icon" variant="ghost">
          <img
            src={track.provider === 'deezer' ? '/deezer_logo.png' : '/spotify_logo.png'}
            alt="Source"
            className="size-5"
          />
        </Button>
      </a>
      <Button onClick={handlePlay} size="icon" variant="ghost">
        {playing && trackId === track.id ? <PauseIcon size={20} /> : <PlayIcon size={20} />}
      </Button>
      <div className="flex flex-1 flex-col justify-center">
        <p>Artist: {track.artist}</p>
        <p>Title: {track.title}</p>
      </div>
    </div>
  )
}

export default SearchTrack
