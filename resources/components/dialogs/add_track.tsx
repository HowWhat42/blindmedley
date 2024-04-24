import { useForm } from '@inertiajs/react'
import { useState } from 'react'

import SearchTrack from '../search_track'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { ScrollArea } from '../ui/scroll-area'

const AddTrackDialog = ({ children, playlist }: { children: React.ReactNode; playlist: any }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [tracks, setTracks] = useState([])
  const form = useForm({
    track: null,
  })

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    const data = await fetch(`/tracks/search?title=${e.target.value}`).then((res) => res.json())
    const filteredData = data.filter((track) => !playlist.tracks.some((t) => t.id === track.id))
    setTracks(filteredData)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add track to playlist</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
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
                <SearchTrack key={track.id} track={track} playlistId={playlist.id} />
              ))}
            </div>
          </ScrollArea>
        )}
        <DialogFooter className="!justify-start">
          <Button variant="outline">
            <DialogClose>Close</DialogClose>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddTrackDialog
