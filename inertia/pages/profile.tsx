import { Head } from '@inertiajs/react'

import useUser from '~/hooks/use_user'

import ProfileCard from '../components/profile_card'
import { Layout } from '../layouts/layout'

export default function Profile() {
  const user = useUser()

  return (
    <>
      <Head title={user.userName} />

      <Layout user={user}>
        <div>
          <ProfileCard user={user} />
        </div>
      </Layout>
    </>
  )
}
