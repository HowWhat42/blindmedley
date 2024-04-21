import { useForm } from '@inertiajs/react'
import { useState } from 'react'
import { toast } from 'sonner'

import type Playlist from '#models/playlist'

import SearchTrack from '../search_track'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { ScrollArea } from '../ui/scroll-area'

const AddTrackDialog = ({
  children,
  playlist,
}: {
  children: React.ReactNode
  playlist: Playlist
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [tracks, setTracks] = useState([])
  const form = useForm({
    track: null,
  })

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    form.put(`/playlists/${playlist.id}`, {
      onSuccess: () => {
        setIsDialogOpen(false)
        toast.success('Track added')
      },
      onError: (error) => {
        toast.error('Failed to add track', {
          description: error.message,
        })
      },
    })
  }

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    const data = await fetch(`/tracks/search?title=${e.target.value}`).then((res) => res.json())
    setTracks(data)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add track to playlist</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-3">
          <div className="grid gap-1">
            <Label>Title</Label>
            <Input
              id="title"
              placeholder="Rock"
              type="text"
              autoCorrect="off"
              disabled={form.processing}
              value={title}
              onChange={handleSearch}
            />
          </div>
          {title && tracks.length > 0 && (
            <ScrollArea className="h-full max-h-96">
              <div>
                {tracks.map((track) => (
                  <SearchTrack key={track.id} track={track} />
                ))}
              </div>
            </ScrollArea>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddTrackDialog
