import { Head } from '@inertiajs/react'

import CreatePlaylistDialog from '../components/dialogs/create_playlist'
import PlaylistCard from '../components/playlist_card'
import { Button } from '../components/ui/button'

export default function Home() {
  // const { user } = usePage<any>().props

  return (
    <>
      <Head title="Homepage" />

      <div>
        <div className="flex justify-between">
          <h2>Trending Playlists</h2>
          <CreatePlaylistDialog>
            <Button>Create Playlist</Button>
          </CreatePlaylistDialog>
        </div>
        <PlaylistCard />
      </div>
    </>
  )
}
