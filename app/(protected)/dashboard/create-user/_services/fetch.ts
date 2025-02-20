import { currentRole, currentUser } from '@/lib/auth'
import { UserActionProps } from '@/app/(protected)/dashboard/create-user/_types'
import { RolesEnum } from '@prisma/client'
import db from '@/lib/db'

export async function fetchUser(props: UserActionProps) {
  const { name, role } = props
  const ROLES = role?.toUpperCase() as RolesEnum

  const USER = await currentUser()
  const USER_ID = USER?.id

  const ROLE = await currentRole()

  if (ROLE === 'STUDENT' || ROLE === 'TEACHER') {
    return { status: 401, message: 'No tienes permisos.' }
  }

  try {
    if (name || role) {
      const USERS = await db.user.findMany({
        where: {
          id: { not: USER_ID },
          ...(name && { name: { contains: name } }),
          ...(role && { role: { equals: ROLES } }),
        },
        orderBy: [{ createdAt: 'asc' }, { name: 'asc' }],
      })

      return USERS
    }

    const USERS = await db.user.findMany({
      where: { id: { not: USER_ID } },
      orderBy: [{ createdAt: 'asc' }, { name: 'asc' }],
    })

    return USERS
  } catch {
    return null
  }
}
