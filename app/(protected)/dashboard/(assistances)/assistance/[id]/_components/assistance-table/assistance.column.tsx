'use client'

import { ColumnDef } from '@tanstack/react-table'
import { AssistanceForm } from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_components/assistance-form'
import { AlertButton } from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_components/alert-button'
import { StudentsProps } from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_types'

export const assistanceColumns: ColumnDef<StudentsProps>[] = [
  {
    accessorKey: 'students',
    header: 'Estudiantes',
    cell: ({ row }) => {
      const { name, lastName } = row.original

      return (
        <div className='flex flex-col space-y-1'>
          <h2 className='text-sm line-clamp-1'>
            {name} {lastName}
          </h2>
        </div>
      )
    },
  },
  {
    accessorKey: 'assistance',
    header: 'Asistencias',
    cell: ({ row }) => {
      const data = row.original
     return <AssistanceForm {...data} />
    },
  },
  {
    accessorKey: 'actions',
    header: 'Acciones',
    cell: ({ row }) => {
      const data = row.original
     return <AlertButton {...data} />
    },
  },
]
