import { Head } from '@inertiajs/react'

export default function Home(props: { version: number }) {
  return (
    <>
      <Head title="Homepage" />

      <div>
        <div className="text-red-500">AdonisJS {props.version} x Inertia x React</div>
      </div>
    </>
  )
}
