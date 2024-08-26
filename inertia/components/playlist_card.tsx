import { Link } from '@inertiajs/react'
import { EditIcon } from 'lucide-react'

import { Button } from './ui/button'

const PlaylistCard = ({ playlist, edit = false }: { playlist: any; edit?: boolean }) => {
  return (
    <Link href={`/playlists/${playlist.id}/play`}>
      <div className="group relative h-64 w-[400px] overflow-hidden rounded-2xl hover:cursor-pointer">
        <img
          className="size-full object-cover object-center transition-all duration-500 group-hover:scale-125"
          alt="playlist cover"
          src={playlist.cover_url ?? `https://picsum.photos/400/400?random=${playlist.id}`}
        />
        <div className="absolute bottom-0 size-full bg-black/10 opacity-0 transition-all duration-500 group-hover:opacity-100" />
        <Link href={`/games/${playlist.id}/play`}>
          <p className="absolute top-0 flex size-full items-center justify-center text-3xl font-black uppercase text-violet-50 opacity-0 transition-all duration-500 group-hover:opacity-100">
            Start game
          </p>
        </Link>
        <div className="absolute bottom-0 h-20 w-full bg-gradient-to-t from-black to-transparent" />
        <div className="absolute bottom-4 left-4 flex-col items-start justify-end">
          <p className="text-xl font-black text-violet-50 transition-all duration-300 group-hover:opacity-0">
            {playlist.title}
          </p>
          <p className="text-lg font-medium text-violet-50 transition-all duration-300 group-hover:opacity-0">
            {playlist.tracks_count} track{playlist.tracks_count > 1 ? 's' : ''}
          </p>
        </div>
        {edit && (
          <Link href={`/playlists/${playlist.id}`}>
            <Button
              className="absolute bottom-4 right-4 text-violet-700 opacity-0 transition-all duration-300 hover:text-violet-700 group-hover:opacity-100"
              size="icon"
              variant="outline"
            >
              <EditIcon size={24} />
            </Button>
          </Link>
        )}
        <div className="absolute bottom-0 h-2.5 w-full bg-violet-700 transition-all duration-300 group-hover:opacity-0" />
      </div>
    </Link>
  )
}

export default PlaylistCard
