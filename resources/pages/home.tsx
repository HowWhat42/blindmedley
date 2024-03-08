import { Button } from '../components/ui/button'
import { Head, router } from '@inertiajs/react'

export default function Home(props: { version: number }) {
  const handleLogout = () => {
    router.post('/logout')
  }

  return (
    <>
      <Head title="Homepage" />

      <div>
        <div className="text-red-500">AdonisJS {props.version} x Inertia x React</div>
        <Button onClick={handleLogout}>Log out</Button>
      </div>
    </>
  )
}
