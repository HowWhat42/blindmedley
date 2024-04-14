import { useForm } from '@inertiajs/react'
import { Loader2Icon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { Checkbox } from '#components/ui/checkbox'
import useError from '#resources/hooks/use_error'

import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

const PlaylistDialog = ({
  children,
  user,
  playlist,
}: {
  children: React.ReactNode
  user: any
  playlist?: any
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { title, isPublic } = playlist ?? {}

  const error = useError('playlist')

  const form = useForm({
    title: title ?? '',
    isPublic: isPublic ?? false,
  })

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    form.put(`/playlists/${playlist.id}`, {
      onSuccess: () => {
        setIsDialogOpen(false)
        toast.success('Playlist edited')
      },
      onError: (error) => {
        toast.error('Failed to edit playlist', {
          description: error.message,
        })
      },
    })
  }

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    form.post('/playlists', {
      onSuccess: () => {
        setIsDialogOpen(false)
        toast.success('Playlist created')
      },
      onError: (error) => {
        toast.error('Failed to create playlist', {
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
          <DialogTitle>{playlist ? 'Edit' : 'Create'} Playlist</DialogTitle>
        </DialogHeader>
        <form onSubmit={playlist ? handleEdit : handleCreate} className="space-y-3">
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

          {user.role === 'admin' && (
            <div className="flex flex-row items-start space-x-3 space-y-0 p-2">
              <Checkbox
                id="isPublic"
                disabled={form.processing}
                checked={form.data.isPublic}
                onCheckedChange={(checked) => form.setData('isPublic', checked)}
              />
              <Label className="leading-none">Public playlist</Label>
            </div>
          )}

          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" disabled={form.processing}>
            {form.processing ? (
              <Loader2Icon size={24} className="animate-spin" />
            ) : (
              `${playlist ? 'Edit' : 'Create'} Playlist`
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default PlaylistDialog
