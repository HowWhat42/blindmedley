import { Head } from '@inertiajs/react'

import useUser from '~/hooks/use_user'

import ProfileCard from '../components/profile_card'
import { Layout } from '../layouts/layout'

export default function Profile() {
  const user = useUser()

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
