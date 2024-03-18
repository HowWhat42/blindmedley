import { Head, router } from '@inertiajs/react'
import { EditIcon, ImportIcon, PlusIcon, TrashIcon, UserIcon } from 'lucide-react'
import { toast } from 'sonner'

import DeleteCard from '#components/delete_card'
import AddTrackDialog from '#components/dialogs/add_track'
import EditPlaylistDialog from '#components/dialogs/edit_playlist'
import ImportPlaylistDialog from '#components/dialogs/import_playlist'
import { Layout } from '#components/Layout/layout'
import Track from '#components/track'
import { Button } from '#components/ui/button'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '#components/ui/table'

const Playlist = ({ playlist }: { playlist: any }) => {
  const onDelete = () => {
    router.delete(`/playlists/${playlist.id}`, {
      onSuccess: () => {
        toast.success('Playlist deleted')
      },
      onError: () => {
        toast.error('Something went wrong')
      },
    })
  }

  console.log(playlist)

  return (
    <>
      <Head title={playlist.title} />
      <div className="space-y-4">
        <div className="flex justify-between">
          <h2 className="text-2xl font-black text-neutral-700">Playlist {playlist.title}</h2>
          <div className="flex gap-2">
            <AddTrackDialog playlist={playlist}>
              <Button size="icon" variant="secondary">
                <PlusIcon size={20} />
              </Button>
            </AddTrackDialog>
            <EditPlaylistDialog playlist={playlist}>
              <Button size="icon" variant="secondary">
                <EditIcon size={20} />
              </Button>
            </EditPlaylistDialog>
            <ImportPlaylistDialog playlist={playlist}>
              <Button size="icon" variant="secondary">
                <ImportIcon size={20} />
              </Button>
            </ImportPlaylistDialog>
            <Button size="icon" variant="secondary">
              <UserIcon size={20} />
            </Button>
            <DeleteCard
              onDelete={onDelete}
              message="This action cannot be undone. This will permanently delete the playlist from our servers."
            >
              <Button size="icon" variant="destructive">
                <TrashIcon size={20} />
              </Button>
            </DeleteCard>
          </div>
        </div>

        <div className="rounded-xl border-2 border-violet-500 p-4">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Source</TableHead>
                <TableHead>Answer</TableHead>
                <TableHead>Album</TableHead>
                <TableHead>Release year</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <Track />
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}

Playlist.layout = (page: any) => {
  const { user } = page.props
  return <Layout user={user}>{page}</Layout>
}

export default Playlist
