import { Head, usePage } from '@inertiajs/react'

import PlaylistCard from '../components/playlist_card'

export default function Home() {
  const { user } = usePage<any>().props

  return (
    <>
      <Head title="Homepage" />

      <div>
        <PlaylistCard />
      </div>
    </>
  )
}
