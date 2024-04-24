import type { InferPageProps } from '@adonisjs/inertia/types'
import { Head, router, useForm } from '@inertiajs/react'
import { EditIcon, ImportIcon, PlusIcon, TrashIcon, UserIcon } from 'lucide-react'
import { toast } from 'sonner'

import DeleteCard from '#components/delete_card'
import AddTrackDialog from '#components/dialogs/add_track'
import ImportPlaylistDialog from '#components/dialogs/import_playlist'
import PlaylistDialog from '#components/dialogs/playlist_dialog'
import { Button } from '#components/ui/button'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '#components/ui/table'
import type PlaylistController from '#controllers/playlist_controller'
import type User from '#models/user'
import TrackRow from '#resources/components/track_row'
import { Layout } from '#resources/layouts/layout'

type Props = InferPageProps<PlaylistController, 'show'> & {
  user: User
}

const Playlist = ({ playlist, tracks, user }: Props) => {
  const form = useForm()
  const onDelete = () => {
    form.delete(`/playlists/${playlist.id}`, {
      onSuccess: () => {
        toast.success('Playlist deleted')
      },
      onError: () => {
        toast.error('Something went wrong')
      },
    })
  }

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
            <PlaylistDialog user={user} playlist={playlist}>
              <Button size="icon" variant="secondary">
                <EditIcon size={20} />
              </Button>
            </PlaylistDialog>
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
                <TableHead className="w-12">Preview</TableHead>
                <TableHead>Answer</TableHead>
                {/* <TableHead>Album</TableHead> */}
                <TableHead>Release year</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tracks.data.map((track) => (
                <TrackRow key={track.id} playlistId={playlist.id} track={track} />
              ))}
            </TableBody>
          </Table>
          {tracks.data.length === 0 && (
            <div className="mt-4 text-center text-neutral-500">No tracks in this playlist</div>
          )}
        </div>
        <div className="flex justify-end gap-2">
          {tracks.meta.previousPageUrl && (
            <Button
              onClick={() =>
                router.visit(`/playlists/${playlist.id}${tracks.meta.previousPageUrl}`)
              }
            >
              Prev
            </Button>
          )}
          {tracks.meta.nextPageUrl && (
            <Button
              onClick={() => router.visit(`/playlists/${playlist.id}${tracks.meta.nextPageUrl}`)}
            >
              Next
            </Button>
          )}
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
