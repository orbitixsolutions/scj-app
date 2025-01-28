'use client'

import { InitialListForm } from '@/app/(protected)/dashboard/initial-list/_components/initial-list-form'
import { Prisma } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'

export type Students = Prisma.StudentsGetPayload<{
  include: { initialAssistances: true }
}>

export const StudentColumns: ColumnDef<Students>[] = [
  {
    accessorKey: 'students',
    header: 'Estudiantes',
    cell: ({ row }) => {
      const { name, lastName } = row.original

      return (
        <h2 className='text-sm line-clamp-1'>
          {name} {lastName}
        </h2>
      )
    },
  },
  {
    accessorKey: 'actions',
    header: 'Acciones',
    cell: ({ row }) => {
      const { initialAssistances } = row.original

      return <InitialListForm initialList={initialAssistances!} />
    },
  },
]
