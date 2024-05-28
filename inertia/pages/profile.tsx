import { Head, usePage } from '@inertiajs/react'

import ProfileCard from '../components/profile_card'
import { Layout } from '../layouts/layout'

export default function Profile() {
  const { user } = usePage<any>().props

  return (
    <>
      <Head title={user.userName} />

      <div>
        <ProfileCard user={user} />
      </div>
    </>
  )
}

Profile.layout = (page: any) => {
  const { user } = page.props
  return <Layout user={user}>{page}</Layout>
}
