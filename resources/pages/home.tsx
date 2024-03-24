import { Head } from '@inertiajs/react'

import { Layout } from '#components/Layout/layout'

import CreatePlaylistDialog from '../components/dialogs/create_playlist'
import { Button } from '../components/ui/button'

export default function Home({ user }: { user: any }) {
  return (
    <>
      <Head title="Homepage" />

      <div>
        <div className="flex justify-between">
          <h2>Trending Playlists</h2>
          <CreatePlaylistDialog user={user}>
            <Button>Create Playlist</Button>
          </CreatePlaylistDialog>
        </div>
      </div>
    </>
  )
}

Home.layout = (page: any) => {
  const { user } = page.props
  return <Layout user={user}>{page}</Layout>
}
