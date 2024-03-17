import { Head } from '@inertiajs/react'

const Playlist = ({ playlist }: { playlist: any }) => {
  return (
    <>
      <Head title={playlist.title} />
      <div>Playlist {playlist.title}</div>
    </>
  )
}

export default Playlist
