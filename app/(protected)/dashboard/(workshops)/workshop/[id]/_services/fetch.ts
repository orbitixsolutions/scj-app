import { currentRole } from '@/lib/auth'
import { Prisma } from '@prisma/client'
import db from '@/lib/db'
import { WorkshopStudentActionProps } from '../_types'

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

export async function getStudents(
  id: string,
  params: WorkshopStudentActionProps
) {
  const { name } = params

  const ROLE = await currentRole()

  if (ROLE === 'STUDENT') {
    return null
  }

  try {
    if (name) {
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

      const FILTERED_STUDENTS = STUDENTS.filter((student) =>
        student.name.toLowerCase().includes(name.toLowerCase())
      )

      return FILTERED_STUDENTS
    }

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

    return STUDENTS
  } catch {
    return null
  }
}
