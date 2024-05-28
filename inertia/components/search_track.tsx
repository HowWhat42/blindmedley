import { router } from '@inertiajs/react'
import { CheckIcon, Loader2Icon, PauseIcon, PlayIcon, PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import useAudioPlayerStore from '../stores/audio_player_store'
import { Button } from './ui/button'

const SearchTrack = ({ track, playlistId }: any) => {
  const { trackId, audio, playing, togglePlay, setUrl } = useAudioPlayerStore()
  const [loading, setLoading] = useState(false)
  const [added, setAdded] = useState(false)

  const handlePlay = () => {
    if (audio.src !== track.previewUrl) {
      setUrl(track.previewUrl, track.id)
    }

    togglePlay()
  }

  const handleAdd = () => {
    setLoading(true)
    router.put(
      `/playlists/${playlistId}/add-track`,
      {
        trackId: track.id,
        provider: track.provider,
      },
      {
        onSuccess: () => {
          toast.success('Track added')
          setLoading(false)
          setAdded(true)
        },
        onError: (error) => {
          setLoading(false)
          toast.error('Failed to add track', {
            description: error.message,
          })
        },
      }
    )
  }

  return (
    <div className="mr-3 flex gap-3">
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
      <Button onClick={handleAdd} disabled={loading || added} size="icon" variant="secondary">
        {loading ? (
          <Loader2Icon size={24} className="animate-spin" />
        ) : added ? (
          <CheckIcon size={20} />
        ) : (
          <PlusIcon size={20} />
        )}
      </Button>
    </div>
  )
}

export default SearchTrack
