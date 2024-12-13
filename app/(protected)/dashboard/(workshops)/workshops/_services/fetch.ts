import { currentRole } from '@/lib/auth'
import { WorkshopActionProps } from '@/app/(protected)/dashboard/(workshops)/workshops/_types'
import db from '@/lib/db'

export async function getWorkshops(props: WorkshopActionProps) {
  const { workshop_name, teacher_id } = props

  const ROLE = await currentRole()

  if (ROLE === 'STUDENT' || ROLE === 'TEACHER') {
    return null
  }

  try {
    if (workshop_name || teacher_id) {
      const WORKSHOPS = await db.workshops.findMany({
        include: {
          students: true,
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

      const FILTERED_WORKSHOPS = WORKSHOPS.filter(
        (w) =>
          w.teacherId.includes(teacher_id) ||
          w.name.toLowerCase().includes(workshop_name.toLowerCase())
      )

      return FILTERED_WORKSHOPS
    }

    const WORKSHOPS = await db.workshops.findMany({
      include: {
        students: true,
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
