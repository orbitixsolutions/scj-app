import { currentRole } from '@/lib/auth'
import { WorkshopActionProps } from '@/app/(protected)/dashboard/(workshops)/workshops/_types'
import { Prisma } from '@prisma/client'
import { db } from '@/lib/db'

type TeacherProps = {
  select: {
    name: true
    lastName: true
    email: true
    role: true
    description: true
    id: true
    updatedAt: true
    createdAt: true
    documentIdentity: true
  }
}

type WorkshopsProps = Prisma.WorkshopsGetPayload<{
  include: {
    students: true
    teacher: TeacherProps
  }
}>

function filterWorkshops(
  workshops: WorkshopsProps[],
  filters: WorkshopActionProps
) {
  const { workshop_name, teacher_id } = filters

  return workshops.filter((item) => {
    const matcher = [
      workshop_name
        ? item.name.toLowerCase().includes(workshop_name.toLowerCase())
        : true,
      teacher_id ? item.teacherId.includes(teacher_id) : true,
    ]

    return matcher.every(Boolean)
  })
}

export async function getWorkshops(props: WorkshopActionProps) {
  const ROLE = await currentRole()

  if (ROLE === 'STUDENT' || ROLE === 'EDUCATOR') {
    return null
  }

  try {
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

    const FILTERED_WORKSHOPS = filterWorkshops(WORKSHOPS, props)

    return FILTERED_WORKSHOPS
  } catch {
    return null
  }
}
