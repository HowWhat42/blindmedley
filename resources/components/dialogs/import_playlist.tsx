import { useForm } from '@inertiajs/react'
import { Loader2Icon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

const ImportPlaylistDialog = ({
  children,
  playlist,
}: {
  children: React.ReactNode
  playlist: any
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const form = useForm({
    url: '',
  })

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!form.data.url.includes('spotify') && !form.data.url.includes('deezer')) {
      toast.error('Invalid URL')
      return
    }

    const provider = form.data.url.includes('spotify') ? 'spotify' : 'deezer'

    if (form.data.url.includes('spotify')) {
      form.data.url = form.data.url.replace('https://open.spotify.com/playlist/', '')
    }

    if (form.data.url.includes('deezer')) {
      form.data.url = form.data.url.replace('https://www.deezer.com/fr/playlist/', '')
    }

    form.post(`/playlists/${playlist.id}/import?provider=${provider}`, {
      onSuccess: () => {
        setIsDialogOpen(false)
        toast.success('Playlist imported')
      },
      onError: (error) => {
        toast.error('Failed to import playlist', {
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
          <DialogTitle>Import playlist</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-3">
          <div className="space-y-1">
            <Label>URL</Label>
            <Input
              id="url"
              autoCorrect="off"
              disabled={form.processing}
              value={form.data.url}
              onChange={(e) => form.setData('url', e.target.value)}
            />
            <Label className="text-sm text-neutral-500 dark:text-neutral-400">
              Enter the URL of the playlist you want to import (Spotify, Deezer)
            </Label>
          </div>

          <Button type="submit" disabled={form.processing}>
            {form.processing ? (
              <Loader2Icon size={24} className="animate-spin" />
            ) : (
              'Import playlist'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ImportPlaylistDialog
