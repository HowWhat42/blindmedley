import { zodResolver } from '@hookform/resolvers/zod'
import { router } from '@inertiajs/react'
import { Loader2Icon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Checkbox } from '#components/ui/checkbox'

import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

const PlaylistFormSchema = z.object({
  title: z.string().min(3).max(255),
  isPublic: z.boolean(),
})

type PlaylistFormValues = z.infer<typeof PlaylistFormSchema>

const PlaylistDialog = ({
  children,
  user,
  playlist,
}: {
  children: React.ReactNode
  user: any
  playlist?: any
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { title, isPublic } = playlist ?? {}

  const form = useForm<PlaylistFormValues>({
    resolver: zodResolver(PlaylistFormSchema),
    defaultValues: {
      title: title ?? '',
      isPublic: isPublic ?? false,
    },
  })

  const handleEdit = async (values: PlaylistFormValues) => {
    router.put(`/playlists/${playlist.id}`, values, {
      onStart: () => {
        setIsLoading(true)
      },
      onSuccess: () => {
        setIsLoading(false)
        setIsDialogOpen(false)
        toast.success('Playlist edited')
      },
      onError: (error) => {
        setIsLoading(false)
        toast.error('Failed to edit playlist', {
          description: error.message,
        })
      },
    })
  }

  const handleCreate = async (values: PlaylistFormValues) => {
    router.post('/playlists', values, {
      onStart: () => {
        setIsLoading(true)
      },
      onSuccess: () => {
        setIsLoading(false)
        setIsDialogOpen(false)
        toast.success('Playlist created')
      },
      onError: (error) => {
        setIsLoading(false)
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
          <DialogTitle>Edit Playlist</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(playlist ? handleEdit : handleCreate)}
            className="space-y-3"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {user.role === 'admin' && (
              <FormField
                control={form.control}
                name="isPublic"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-2">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="leading-none">Public playlist</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2Icon size={24} className="animate-spin" />
              ) : playlist ? (
                'Edit Playlist'
              ) : (
                'Create Playlist'
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default PlaylistDialog
