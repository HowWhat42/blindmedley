import { Head } from '@inertiajs/react'

import { Layout } from '#components/Layout/layout'

import CreatePlaylistDialog from '../components/dialogs/create_playlist'
import PlaylistCard from '../components/playlist_card'
import { Button } from '../components/ui/button'

const Playlist = ({ playlists, user }: { playlists: any; user: any }) => {
  return (
    <>
      <Head title="Playlists" />
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2>Playlists</h2>
          <CreatePlaylistDialog user={user}>
            <Button>Create Playlist</Button>
          </CreatePlaylistDialog>
        </div>
        <div className="flex flex-wrap gap-20">
          {playlists.map((playlist: any) => (
            <PlaylistCard edit key={playlist.id} playlist={playlist} />
          ))}
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
