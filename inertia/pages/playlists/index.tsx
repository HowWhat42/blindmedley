import { Head } from '@inertiajs/react'

import Playlist from '#models/playlist'
import useUser from '~/hooks/use_user'

import PlaylistDialog from '../../components/dialogs/playlist_dialog'
import PlaylistCard from '../../components/playlist_card'
import { Button } from '../../components/ui/button'
import { Layout } from '../../layouts/layout'

const Index = ({ playlists }: { playlists: Playlist[] }) => {
  const user = useUser()
  return (
    <>
      <Head title="Playlists" />

      <Layout user={user}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2>Playlists</h2>
            <PlaylistDialog user={user}>
              <Button>Create Playlist</Button>
            </PlaylistDialog>
          </div>
          <div className="flex flex-wrap gap-20">
            {playlists.map((playlist: any) => (
              <PlaylistCard edit key={playlist.id} playlist={playlist} />
            ))}
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Index
