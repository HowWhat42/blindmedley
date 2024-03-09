import { Head, usePage } from '@inertiajs/react'

export default function Home(props: { version: number }) {
  const { user } = usePage<any>().props

  return (
    <>
      <Head title="Homepage" />

      <div>
        <h2 className="text-3xl text-neutral-900 dark:text-purple-100 font-bold font-geist">
          Welcome, {user.userName}
        </h2>
      </div>
    </>
  )
}
