import { currentRole, currentUser } from '@/lib/auth'
import { UserActionProps } from '@/app/(protected)/dashboard/create-user/_types'
import { RolesEnum, User } from '@prisma/client'
import { db } from '@/lib/db'

function filterUser(users: User[], filters: UserActionProps) {
  const { name, role } = filters
  const ROLES = role?.toUpperCase() as RolesEnum

  return users.filter((user) => {
    const matcher = [
      name ? user.name.includes(name) : true,
      role ? user.role === ROLES : true,
    ]

    return matcher.every(Boolean)
  })
}

export async function fetchUser(props: UserActionProps) {
  const [USER, ROLE] = await Promise.all([currentUser(), currentRole()])

  const USER_ID = USER?.id

  if (ROLE === 'STUDENT' || ROLE === 'EDUCATOR') {
    return { status: 401, message: 'No tienes permisos.' }
  }

  try {
    const USERS = await db.user.findMany({
      where: { id: { not: USER_ID } },
      orderBy: [{ createdAt: 'asc' }, { name: 'asc' }],
    })

    const FILTERED_USERS = filterUser(USERS, props)

    return FILTERED_USERS
  } catch {
    return null
  }
}
