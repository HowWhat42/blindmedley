import { Head, router } from '@inertiajs/react'

import DeleteCard from '#components/delete_card'
import { Layout } from '#components/Layout/layout'
import { Button } from '#components/ui/button'

const Playlist = ({ playlist }: { playlist: any }) => {
  return (
    <>
      <Head title={playlist.title} />
      <div className="flex justify-between">
        <h2>Playlist {playlist.title}</h2>
        <DeleteCard
          onDelete={() => router.delete(`/playlists/${playlist.id}`)}
          message="This action cannot be undone. This will permanently delete the playlist from our servers."
        >
          <Button>Delete Playlist</Button>
        </DeleteCard>
      </div>
    </>
  )
}

Playlist.layout = (page: any) => {
  const { user } = page.props
  return <Layout user={user}>{page}</Layout>
}

export default Playlist
