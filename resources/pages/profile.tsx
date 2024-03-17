import { Head, usePage } from '@inertiajs/react'

import ProfileCard from '../components/profile_card'

export default function Home() {
  const { user } = usePage<any>().props

  return (
    <>
      <Head title={user.userName} />

      <div>
        <ProfileCard />
      </div>
    </>
  )
}
