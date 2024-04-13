import { useForm } from '@inertiajs/react'
import { EditIcon, TrashIcon } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from './ui/button'
import { TableCell, TableRow } from './ui/table'

const Track = ({ playlistId, track }: { playlistId: string; track: any }) => {
  const form = useForm()
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
        <audio controls>
          <source src={track.previewUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
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
