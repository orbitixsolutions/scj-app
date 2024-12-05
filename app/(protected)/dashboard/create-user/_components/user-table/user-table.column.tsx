'use client'

import { Badge } from '@/components/ui/badge'
import { User } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { UserActions } from '@/app/(protected)/dashboard/create-user/_components/user-actions'
import { getRoleName } from '@/helpers/get-role-name'
import parse from 'react-html-parser'

export type Users = User

export const UserColumns: ColumnDef<Users>[] = [
  {
    accessorKey: 'users',
    header: 'Usuarios',
    cell: ({ row }) => {
      const { name, lastName, description } = row.original

      return (
        <div className='flex flex-col space-y-1'>
          <h2 className='text-xl line-clamp-1'>
            {name} {lastName}
          </h2>
          <span className='editor'>{parse(description)}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'role',
    header: 'Roles',
    cell: ({ row }) => {
      const { role } = row.original
      return (
        <Badge
          variant='outline'
          className='px-4'
        >
          {getRoleName(role)}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'actions',
    header: '',
    cell: ({ row }) => {
      const { id } = row.original

      return (
        <div className='flex items-center space-x-8'>
          <UserActions id={id} />
        </div>
      )
    },
  },
]
