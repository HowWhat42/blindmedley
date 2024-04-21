import { useForm } from '@inertiajs/react'
import { EditIcon, PauseIcon, PlayIcon, TrashIcon } from 'lucide-react'
import { toast } from 'sonner'

import useAudioPlayerStore from '#resources/stores/audio_player_store'

import { Button } from './ui/button'
import { TableCell, TableRow } from './ui/table'

const Track = ({ playlistId, track }: { playlistId: string; track: any }) => {
  const form = useForm()
  const { trackId, audio, playing, togglePlay, setUrl } = useAudioPlayerStore()

  const handleDelete = () => {
    form.delete(`/playlists/${playlistId}/remove-track`, {
      data: {
        trackId: track.id,
      },
      onSuccess: () => {
        toast.success('Track removed')
      },
      onError: () => {
        toast.error('Something went wrong')
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
        <Button disabled={form.processing} size="icon" variant="secondary">
          <EditIcon size={20} />
        </Button>
        <Button disabled={form.processing} onClick={handleDelete} size="icon" variant="destructive">
          <TrashIcon size={20} />
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default Track
