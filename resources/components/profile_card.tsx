import React from 'react'

import { Avatar, AvatarFallback } from '#components/ui/avatar'

import History from './history'

const ProfileCard = ({ user }: { user: any }) => {
  return (
    <div className="mx-40 mt-32 rounded-3xl bg-zinc-300">
      <div className="flex content-center">
        <Avatar className="mx-auto -mt-32 size-64 rounded-full bg-purple-500">
          <AvatarFallback className="text-6xl">{user.userName[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </div>
      <div className="-mt-24 ml-12">
        <h3 className="flex content-center text-3xl">{user.userName}</h3>
        <ul className="font-['Urbanist'] text-lg font-normal leading-7 text-neutral-900">
          <li>
            Profile Creation :{' '}
            {new Date(user.createdAt).toLocaleDateString('fr-FR', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </li>
          <li>
            Account experience : {user.xp} (Level: {user.level})
          </li>
          <li>Total games played : 5125</li>
          <li>Playlist Created : 2505</li>
        </ul>
        <div className="inline-flex items-start justify-start gap-[9px]">
          <div className="flex h-[23px] w-[97px] items-center justify-center gap-1.5 rounded-lg border border-violet-500 bg-violet-500 px-3 py-1.5">
            <button className="font-['Urbanist'] text-xs font-medium leading-none text-violet-50">
              Add friend
            </button>
          </div>
          <div className="flex h-[23px] w-[97px] items-center justify-center gap-1.5 rounded-lg border border-violet-500 bg-violet-500 px-3 py-1.5">
            <button className="font-['Urbanist'] text-xs font-medium leading-none text-violet-50">
              View Playlists
            </button>
          </div>
        </div>
      </div>
      <div>
        <History />
      </div>
    </div>
  )
}

export default ProfileCard
