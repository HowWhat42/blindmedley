import { Head } from '@inertiajs/react'

import PlaylistDialog from '../components/dialogs/playlist_dialog'
import { Button } from '../components/ui/button'
import { Layout } from '../layouts/layout'

export default function Home({ user }: { user: any }) {
  return (
    <>
      <Head title="Homepage" />

      <div>
        <div className="flex justify-between">
          <h2>Trending Playlists</h2>
          <PlaylistDialog user={user}>
            <Button>Create Playlist</Button>
          </PlaylistDialog>
        </div>
      </div>
    </>
  )
}

Home.layout = (page: any) => {
  const { user } = page.props
  return <Layout user={user}>{page}</Layout>
}
