import { Link, router } from '@inertiajs/react'
import _ from 'lodash'
import { Volume1Icon, Volume2Icon, VolumeXIcon } from 'lucide-react'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { Avatar, AvatarFallback } from '#components/ui/avatar'
import type User from '#models/user'
import { Slider } from '#resources/components/ui/slider'
import useAudioPlayerStore from '#resources/stores/audio_player_store'

import { ModeToggle } from '../components/mode_toggle'
import { Button } from '../components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover'

const Header = ({ user }: { user: User }) => {
  const { setVolume } = useAudioPlayerStore()
  const handleLogout = () => {
    router.post('/logout')
  }

  useEffect(() => {
    setVolume(user.volume / 100)
    console.log('volume', user.volume)
  }, [user.volume])

  const handleVolumeChange = (value: number[]) => {
    router.put(
      '/profile/volume',
      {
        volume: value[0],
      },
      {
        onSuccess: () => {
          setVolume(value[0] / 100)
        },
        onError: () => {
          toast.error('Failed to update volume')
        },
      }
    )
  }

  const getVolumeIcon = (volume: number) => {
    switch (volume) {
      case 0:
        return <VolumeXIcon className="size-4" />
      case 100:
        return <Volume2Icon className="size-4" />
      default:
        return <Volume1Icon className="size-4" />
    }
  }

  return (
    <header className="flex w-full items-center justify-between bg-violet-400 px-8 py-3">
      <Link href={'/'}>
        <h1 className="font-geist text-2xl font-bold text-neutral-900">Blindmedley</h1>
      </Link>
      <div className="flex items-center gap-3">
        <Popover>
          <PopoverTrigger className="flex items-center gap-2">
            <p>{user.role}</p>
            <p>{user.userName}</p>
            <Avatar>
              <AvatarFallback>{user.userName[0].toUpperCase()}</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="mr-16 space-y-2">
            <div className="flex gap-2">
              {getVolumeIcon(user.volume)}
              <Slider
                onValueChange={(value: number[]) => _.throttle(handleVolumeChange, 500)(value)}
                defaultValue={[user.volume]}
                max={100}
                step={1}
              />
            </div>
            <ModeToggle />
            <Link href={'/profile'}>
              <Button variant="ghost" className="w-full !justify-end text-right">
                My account
              </Button>
            </Link>

            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full !justify-end text-right hover:bg-red-500 hover:text-white"
            >
              Logout
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  )
}

export default Header
