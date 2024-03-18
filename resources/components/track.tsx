import { EditIcon, TrashIcon } from 'lucide-react'
import React from 'react'

import { Button } from './ui/button'
import { TableCell, TableRow } from './ui/table'

const Track = ({ source }: { source: string }) => {
  return (
    <TableRow>
      <TableCell>
        <Button size="icon" variant="ghost">
          <img
            src={source === 'deezer' ? '/assets/deezer_logo.png' : '/assets/spotify_logo.png'}
            alt="Source"
            className="size-5"
          />
        </Button>
      </TableCell>
      <TableCell className="flex flex-col justify-center">
        <p>Artist 1</p>
        <p>Title 1</p>
      </TableCell>
      <TableCell>Album 1</TableCell>
      <TableCell>Date 1</TableCell>
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
