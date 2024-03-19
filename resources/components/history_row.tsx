import React from 'react'

import { TableCell, TableRow } from './ui/table'

const HistoryRow = ({ history }: { history: any }) => {
  return (
    <TableRow>
      <TableCell>{history.name}</TableCell>
      <TableCell>{history.type}</TableCell>
      <TableCell>{history.score}</TableCell>
      <TableCell>{history.date}</TableCell>
    </TableRow>
  )
}

export default HistoryRow
