import { router } from '@inertiajs/react'
import { EditIcon, PauseIcon, PlayIcon, TrashIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import useAudioPlayerStore from '#resources/stores/audio_player_store'

import { Button } from './ui/button'
import { TableCell, TableRow } from './ui/table'

const TrackRow = ({ playlistId, track }: { playlistId: string; track: any }) => {
  const [loading, setLoading] = useState(false)
  const { trackId, audio, playing, togglePlay, setUrl } = useAudioPlayerStore()

  const handleDelete = () => {
    router.delete(`/playlists/${playlistId}/remove-track`, {
      data: {
        trackId: track.id,
      },
      onStart: () => {
        setLoading(true)
      },
      onSuccess: () => {
        toast.success('Track removed')
        setLoading(false)
      },
      onError: () => {
        toast.error('Something went wrong')
        setLoading(false)
      },
    })
  }

  const handlePlay = () => {
    if (audio.src !== track.previewUrl) {
      setUrl(track.previewUrl, track.id)
    }

    togglePlay()
  }

  return (
    <TableRow>
      <TableCell>
        <a href={track.trackUrl} target="_blank" rel="noreferrer">
          <Button size="icon" variant="ghost">
            <img
              src={track.provider === 'deezer' ? '/deezer_logo.png' : '/spotify_logo.png'}
              alt="Source"
              className="size-5"
            />
          </Button>
        </a>
      </TableCell>
      <TableCell>
        <Button onClick={handlePlay} size="icon" variant="ghost">
          {playing && trackId === track.id ? <PauseIcon size={20} /> : <PlayIcon size={20} />}
        </Button>
      </TableCell>
      <TableCell className="flex flex-col justify-center">
        <p>Artist: {track.artist}</p>
        <p>Title: {track.title}</p>
      </TableCell>
      {/* <TableCell>{track.album ?? 'Single'}</TableCell> */}
      <TableCell>{track.releaseDate}</TableCell>
      <TableCell className="space-x-3 text-right">
        <Button disabled={loading} size="icon" variant="secondary">
          <EditIcon size={20} />
        </Button>
        <Button disabled={loading} onClick={handleDelete} size="icon" variant="destructive">
          <TrashIcon size={20} />
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default TrackRow
