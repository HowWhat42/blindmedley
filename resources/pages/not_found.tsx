import { Link } from '@inertiajs/react'
import React from 'react'

import { Button } from '#components/ui/button'

const NotFound = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6 text-center">
      <h1 className="text-7xl font-black">404</h1>
      <div className="flex flex-col gap-2">
        <p className="text-3xl">Page not found</p>

        <Link href="/">
          <Button className="text-xl" variant="link">
            Go back home
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
