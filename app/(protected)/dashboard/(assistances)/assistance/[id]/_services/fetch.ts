'use server'

import {
  AssistancePageProps,
  WorkshopsProps,
} from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_types'
import { Prisma } from '@prisma/client'
import { formatDateToString } from '@/helpers/get-current-date'
import { currentRole } from '@/lib/auth'
import db from '@/lib/db'

function filterByDate(data: WorkshopsProps, currDate: string) {
  const STUDENTS = data.students

  return STUDENTS.map(({ student }) => ({
    ...student,
    assistances: student.assistances.filter((item) => {
      return formatDateToString(item.date) === currDate
    }),
  }))
}

function filterStudents(data: WorkshopsProps, filters: AssistancePageProps) {
  const { lastName, name } = filters.searchParams
  const STUDENTS = data.students.map(({ student }) => ({ ...student }))

  return STUDENTS.filter((item) => {
    const matcher = [
      name ? item.name.includes(name) : true,
      lastName ? item.lastName.includes(lastName) : true,
    ]
    return matcher.every(Boolean)
  })
}

type getStudentsProps = {
  mode: 'normal' | 'filter-by-dates'
  page: AssistancePageProps
}

export async function getStudents(props: getStudentsProps) {
  const { mode, page } = props

  const CURR_DATE = page.searchParams.date
  const WORKSHOP_ID = page.params.id

  const ROLE = await currentRole()

  if (ROLE === 'USER') return null

  try {
    const WORKSHOPS = await db.workshops.findUnique({
      where: { id: WORKSHOP_ID },
      include: {
        students: {
          orderBy: {
            student: { name: 'asc' },
          },
          include: {
            student: {
              select: {
                lastName: true,
                name: true,
                documentIdentity: true,
                institute: true,
                id: true,
                dateOfBirth: true,
                studyYear: true,
                photo: true,
                createdAt: true,
                updatedAt: true,
                assistances: {
                  where: { workshopId: WORKSHOP_ID },
                  orderBy: { createdAt: 'desc' },
                },
              },
            },
          },
        },
      },
    })

    if (!WORKSHOPS) return null
    if (mode === 'normal') return filterStudents(WORKSHOPS, page)
    if (mode === 'filter-by-dates') return filterByDate(WORKSHOPS, CURR_DATE)

    return null
  } catch {
    return null
  }
}

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
