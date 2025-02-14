'use client'

import { DeleteButton } from '@/components/delete-button'
import { formatISODateToString } from '@/helpers/get-current-date'
import { useData } from '@/providers/data-provider'
import { Absents } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { Trash2 } from 'lucide-react'
import { deleteAbsent } from '@/app/(protected)/dashboard/(absents)/absent/[id]/_services/delete'

export const absentColumns: ColumnDef<Absents>[] = [
  {
    accessorKey: 'students',
    header: 'Estudiantes',
    cell: ({ row }) => {
      const { studentId } = row.original

      const Student = () => {
        const { data } = useData()
        const { students } = data

        const STUDENT = students.find((item) => item.id === studentId)
        if (!STUDENT) return

        return (
          <p>
            {STUDENT.name} {STUDENT.lastName}
          </p>
        )
      }

      return <Student />
    },
  },
  {
    accessorKey: 'absentDate',
    header: 'Fecha de ausencia',
    cell: ({ row }) => {
      const { studentId, date } = row.original
      
      const ABSENT_DATE = formatISODateToString(date)

      const AbsentDate = () => {
        const { data } = useData()
        const { students } = data

        const STUDENT = students.find((item) => item.id === studentId)
        if (!STUDENT) return

        return <p>{ABSENT_DATE}</p>
      }

      return <AbsentDate />
    },
  },
  {
    accessorKey: 'actions',
    header: 'Acciones',
    cell: ({ row }) => {
      const { id } = row.original
      const ABSENT_ID = id

      const Actions = () => {
        return (
          <DeleteButton
            itemId={ABSENT_ID}
            onDelete={deleteAbsent}
          >
            <Trash2 />
          </DeleteButton>
        )
      }

      return <Actions />
    },
  },
]
