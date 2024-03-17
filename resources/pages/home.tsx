import { Head, usePage } from '@inertiajs/react'

import PlaylistCard from '../components/playlist_card'

export default function Home() {
  const { user } = usePage<any>().props

  return (
    <>
      <Head title="Homepage" />

      <div>
        <h2 className="text-3xl text-neutral-900 dark:text-purple-100 font-bold font-geist">
          Welcome, {user.userName}
        </h2>
        <PlaylistCard />
      </div>
    </>
  )
}
