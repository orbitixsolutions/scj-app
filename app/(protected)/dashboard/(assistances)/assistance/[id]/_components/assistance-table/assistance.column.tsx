'use client'

import { ColumnDef } from '@tanstack/react-table'
import { StudentsProps } from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_types'
import { AssistanceForm } from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_components/assistance-form'
import { Suspense } from 'react'
import { ButtonIconSkeleton, InputSkeleton } from '@/components/skeletons'
import { AlertButton } from '../alert-button'

export const assistanceColumns: ColumnDef<StudentsProps>[] = [
  {
    accessorKey: 'students',
    header: 'Estudiantes',
    cell: ({ row }) => {
      const { students: STUDENT } = row.original

      return (
        <div className='flex flex-col space-y-1'>
          <h2 className='text-sm line-clamp-1'>
            {STUDENT.name} {STUDENT.lastName}
          </h2>
        </div>
      )
    },
  },
  {
    accessorKey: 'assistance',
    header: 'Asistencias',
    cell: ({ row }) => {
      const { students: ASSISTANCES } = row.original
      return (
        <Suspense fallback={<InputSkeleton />}>
          <AssistanceForm students={ASSISTANCES} />
        </Suspense>
      )
    },
  },
  {
    accessorKey: 'actions',
    header: 'Acciones',
    cell: ({ row }) => {
      const { students: ASSISTANCES } = row.original
      return (
        <Suspense fallback={<ButtonIconSkeleton />}>
          <AlertButton students={ASSISTANCES} />
        </Suspense>
      )
    },
  },
]
