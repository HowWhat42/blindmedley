import { Head, usePage } from '@inertiajs/react'

import { Layout } from '#resources/layouts/layout'

import ProfileCard from '../components/profile_card'

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
