import { useForm } from '@inertiajs/react'
import { Loader2Icon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

const AddTrackDialog = ({ children, playlist }: { children: React.ReactNode; playlist: any }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const form = useForm({
    title: '',
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
              value={form.data.title}
              onChange={(e) => form.setData('title', e.target.value)}
            />
          </div>

          <Button type="submit" disabled={form.processing}>
            {form.processing ? <Loader2Icon size={24} className="animate-spin" /> : 'Add track'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddTrackDialog
