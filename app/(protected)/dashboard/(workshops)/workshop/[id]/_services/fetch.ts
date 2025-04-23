import { currentRole } from '@/lib/auth'
import { Prisma, Students } from '@prisma/client'
import { WorkshopStudentActionProps } from '@/app/(protected)/dashboard/(workshops)/workshop/[id]/_types'
import { db } from '@/lib/db'

export async function getWorkshop(id: string) {
  const ROLE = await currentRole()

  if (ROLE === 'STUDENT') {
    return null
  }

  try {
    const WORKSHOP = await db.workshops.findUnique({
      where: {
        id,
      },
      include: {
        students: true,
        teacher: true,
      },
    })

    return WORKSHOP as Prisma.WorkshopsGetPayload<{
      include: {
        students: true
        teacher: true
      }
    }>
  } catch {
    return null
  }
}

function filterStudents(
  students: Students[],
  params: WorkshopStudentActionProps
) {
  const { firstName, lastName } = params

  return students.filter((student) => {
    const matcher = [
      firstName
        ? student.name.toLowerCase().includes(firstName.toLowerCase())
        : true,
      lastName
        ? student.lastName.toLowerCase().includes(lastName.toLowerCase())
        : true,
    ]

    return matcher.every(Boolean)
  })
}

export async function getStudents(
  id: string,
  params: WorkshopStudentActionProps
) {
  const ROLE = await currentRole()

  if (ROLE === 'STUDENT') {
    return null
  }

  try {
    const STUDENTS = await db.students.findMany({
      include: {
        workshops: true,
      },
      where: {
        workshops: {
          every: {
            workshopId: {
              not: id,
            },
          },
        },
      },
    })

    const FILTERED_STUDENTS = filterStudents(STUDENTS, params)

    return FILTERED_STUDENTS
  } catch {
    return null
  }
}
