import { Head, usePage } from '@inertiajs/react'

import { Layout } from '#components/Layout/layout'

import ProfileCard from '../components/profile_card'

export default function Profile() {
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

Profile.layout = (page: any) => {
  const { user } = page.props
  return <Layout user={user}>{page}</Layout>
}
