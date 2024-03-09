import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { router } from '@inertiajs/react'
import { ModeToggle } from '../mode_toggle'

const Header = ({ user }: { user: any }) => {
  const handleLogout = () => {
    router.post('/logout')
  }

  if (!user) {
    return null
  }

  return (
    <div className="fixed top-0 w-full flex justify-between items-center py-3 px-8 bg-violet-400">
      <h1 className="text-2xl text-neutral-900 font-bold font-geist">Blindmedley</h1>
      <div className="flex items-center gap-3">
        <Popover>
          <PopoverTrigger>
            <p className="w-10 h-10 p-2 bg-neutral-500 rounded-full cursor-pointer">
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
