import { Link, router } from '@inertiajs/react'

import { ModeToggle } from '../mode_toggle'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

const Header = ({ user }: { user: any }) => {
  const handleLogout = () => {
    router.post('/logout')
  }

  if (!user) {
    return null
  }

  return (
    <div className="fixed top-0 z-50 flex w-full items-center justify-between bg-violet-400 px-8 py-3">
      <Link href={'/'}>
        <h1 className="font-geist text-2xl font-bold text-neutral-900">Blindmedley</h1>
      </Link>
      <div className="flex items-center gap-3">
        <Link href={'/profile'}>{user.userName}</Link>
        <Popover>
          <PopoverTrigger>
            <p className="size-10 cursor-pointer rounded-full bg-neutral-500 p-2">
              {user.userName[0].toUpperCase()}
            </p>
          </PopoverTrigger>
          <PopoverContent className="mr-16">
            <Button variant="ghost" className="w-full !justify-end text-right">
              My account
            </Button>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full !justify-end text-right"
            >
              Logout
            </Button>
          </PopoverContent>
        </Popover>
        <ModeToggle />
      </div>
    </div>
  )
}

export default Header
