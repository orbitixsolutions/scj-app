'use client'

import { ColumnDef } from '@tanstack/react-table'
import { StudentsProps } from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_types'
import { cn } from '@/lib/utils'

const getAssistanceClass = (assistances: number) => {
  if (assistances <= 4) return 'text-yellow-500'
  if (assistances <= 6) return 'text-orange-500'
  if (assistances >= 7) return 'text-red-500'
  return 'text-whithe/75'
}

export const absentColumns: ColumnDef<StudentsProps>[] = [
  {
    accessorKey: 'student',
    header: 'Estudiante',
    cell: ({ row }) => {
      const { lastName, name } = row.original

      return (
        <p>
          {name} {lastName}
        </p>
      )
    },
  },

  {
    accessorKey: 'number-absences',
    header: 'Número de ausencias',
    cell: ({ row }) => {
      const { assistances } = row.original

      const FALTS_NUMBER = assistances.filter(
        (a) => a.status === 'NOT_ATTENDED'
      ).length

      return (
        <p className={cn(getAssistanceClass(FALTS_NUMBER))}>{FALTS_NUMBER}</p>
      )
    },
  },
]
