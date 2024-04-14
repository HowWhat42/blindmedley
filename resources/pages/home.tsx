import { Head, usePage } from '@inertiajs/react'

import PlaylistDialog from '#components/dialogs/playlist_dialog'
import { Layout } from '#resources/layouts/layout'

import { Button } from '../components/ui/button'

export default function Home() {
  const { user } = usePage().props
  return (
    <Layout user={user}>
      <div>
        <Head title="Homepage" />

        <div>
          <div className="flex justify-between">
            <h2>Trending Playlists</h2>
            <PlaylistDialog user={user}>
              <Button>Create Playlist</Button>
            </PlaylistDialog>
          </div>
        </div>
      </div>
    </Layout>
  )
}
