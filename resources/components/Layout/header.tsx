import { Link, router } from '@inertiajs/react'

import { Avatar, AvatarFallback } from '#components/ui/avatar'

import { ModeToggle } from '../mode_toggle'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

const Header = ({ user }: { user: any }) => {
  const handleLogout = () => {
    router.post('/logout')
  }

  return (
    <div className="fixed top-0 z-50 flex w-full items-center justify-between bg-violet-400 px-8 py-3">
      <Link href={'/'}>
        <h1 className="font-geist text-2xl font-bold text-neutral-900">Blindmedley</h1>
      </Link>
      <div className="flex items-center gap-3">
        <Popover>
          <PopoverTrigger className="flex items-center gap-2">
            <p>{user.userName}</p>
            <Avatar>
              <AvatarFallback>{user.userName[0].toUpperCase()}</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="mr-16">
            <Link href={'/profile'}>
              <Button variant="ghost" className="w-full !justify-end text-right">
                My account
              </Button>
            </Link>
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
