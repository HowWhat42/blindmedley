import React from 'react'

import { Table, TableBody, TableHead, TableHeader, TableRow } from '#components/ui/table'

import HistoryRow from './history_row'

const History = () => {
  return (
    <div className="mx-4 space-y-4 py-8">
      <h2 className="ml-8 text-2xl font-black text-neutral-700">History</h2>
      <div className="rounded-3xl border-2 border-violet-500 p-4">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Game</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {HistoryData.map((history: any) => (
              <HistoryRow key={history.id} history={history} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default History

const HistoryData = [
  {
    id: '1',
    name: 'coucou',
    type: 'Public',
    score: 250,
    date: new Date().toLocaleDateString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  },
  {
    id: '1',
    name: 'Mystery',
    type: 'Private',
    score: 666,
    date: new Date().toLocaleDateString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  },
  {
    id: '1',
    name: 'Mystery',
    type: 'Private',
    score: 666,
    date: new Date().toLocaleDateString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  },
  {
    id: '1',
    name: 'Mystery',
    type: 'Private',
    score: 666,
    date: new Date().toLocaleDateString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  },
  {
    id: '1',
    name: 'Mystery',
    type: 'Private',
    score: 666,
    date: new Date().toLocaleDateString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  },
  {
    id: '1',
    name: 'Mystery',
    type: 'Private',
    score: 666,
    date: new Date().toLocaleDateString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  },
]
