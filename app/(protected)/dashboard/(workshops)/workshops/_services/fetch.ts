import { currentRole } from '@/lib/auth'
import { WorkshopActionProps } from '@/app/(protected)/dashboard/(workshops)/workshops/_types'
import db from '@/lib/db'

export async function getWorkshops(props: WorkshopActionProps) {
  const { workshop_name } = props

  const ROLE = await currentRole()

  if (ROLE === 'STUDENT' || ROLE === 'TEACHER') {
    return null
  }

  try {
    if (workshop_name) {
      const WORKSHOPS = await db.workshops.findMany({
        where: { name: { contains: workshop_name } },
        include: {
          students: true,
          day: true,
          teacher: {
            select: {
              name: true,
              lastName: true,
              email: true,
              role: true,
              description: true,
              id: true,
              updatedAt: true,
              createdAt: true,
              documentIdentity: true,
            },
          },
        },
        orderBy: [{ createdAt: 'desc' }, { name: 'asc' }],
      })

      return WORKSHOPS
    }

    const WORKSHOPS = await db.workshops.findMany({
      include: {
        students: true,
        day: true,
        teacher: {
          select: {
            name: true,
            lastName: true,
            email: true,
            role: true,
            description: true,
            id: true,
            updatedAt: true,
            createdAt: true,
            documentIdentity: true,
          },
        },
      },
      orderBy: [{ createdAt: 'desc' }, { name: 'asc' }],
    })

    return WORKSHOPS
  } catch {
    return null
  }
}
