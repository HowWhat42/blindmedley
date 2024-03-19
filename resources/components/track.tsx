import { EditIcon, TrashIcon } from 'lucide-react'
import React from 'react'

import { Button } from './ui/button'
import { TableCell, TableRow } from './ui/table'

const Track = ({ track }: { track: any }) => {
  return (
    <TableRow>
      <TableCell>
        <a href={track.trackUrl} target="_blank" rel="noreferrer">
          <Button size="icon" variant="ghost">
            <img
              src={
                track.provider === 'deezer' ? '/assets/deezer_logo.png' : '/assets/spotify_logo.png'
              }
              alt="Source"
              className="size-5"
            />
          </Button>
        </a>
      </TableCell>
      <TableCell>
        <audio controls>
          <source src={track.previewUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </TableCell>
      <TableCell className="flex flex-col justify-center">
        <p>Artist: {track.artist}</p>
        <p>Title: {track.title}</p>
      </TableCell>
      {/* <TableCell>{track.album ?? 'Single'}</TableCell> */}
      <TableCell>{track.releaseDate}</TableCell>
      <TableCell className="space-x-3 text-right">
        <Button size="icon" variant="secondary">
          <EditIcon size={20} />
        </Button>
        <Button size="icon" variant="destructive">
          <TrashIcon size={20} />
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default Track
