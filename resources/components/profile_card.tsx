import React from 'react'

import { Avatar, AvatarFallback } from '#components/ui/avatar'

const ProfileCard = ({ user }: { user: any }) => {
  return (
    <div className="mx-40 mt-32 h-dvh rounded-3xl border-4 bg-zinc-300">
      <div className="flex content-center">
        <Avatar className="mx-auto -mt-32 size-64 rounded-full border-4 bg-purple-500">
          <AvatarFallback className="text-6xl">{user.userName[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}

export default ProfileCard
