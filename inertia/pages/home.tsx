import { Head } from '@inertiajs/react'

import useUser from '~/hooks/use_user'

import PlaylistDialog from '../components/dialogs/playlist_dialog'
import { Button } from '../components/ui/button'
import { Layout } from '../layouts/layout'

export default function Home() {
  const user = useUser()
  return (
    <>
      <Head title="Homepage" />

      <Layout user={user}>
        <div>
          <div className="flex justify-between">
            <h2>Trending Playlists</h2>
            <PlaylistDialog user={user}>
              <Button>Create Playlist</Button>
            </PlaylistDialog>
          </div>
        </div>
      </Layout>
    </>
  )
}
