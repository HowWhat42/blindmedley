import { Head, usePage } from '@inertiajs/react'

export default function Home() {
  const { user } = usePage<any>().props

  return (
    <>
      <Head title={user.userName} />

      <div></div>
    </>
  )
}
