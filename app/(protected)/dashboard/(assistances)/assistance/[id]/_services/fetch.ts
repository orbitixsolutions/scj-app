'use server'

import {
  AssistancePageProps,
  getStudentsProps,
  WorkshopsProps,
} from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_types'
import { Prisma } from '@prisma/client'
import { formatISODateToString } from '@/helpers/get-current-date'
import { currentRole } from '@/lib/auth'
import { db } from '@/lib/db'

function filterAssistances(data: WorkshopsProps, filters: AssistancePageProps) {
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

function filterByDate(data: WorkshopsProps, currDate: string | null) {
  const STUDENTS = data.students

  return STUDENTS.map(({ student }) => ({
    ...student,
    assistances: student.assistances.filter((item) => {
      const matcher = [
        currDate
          ? formatISODateToString(item.date) === currDate
          : true,
      ]

      return matcher.every(Boolean)
    }),
  }))
}

export async function getAssistances(props: getStudentsProps) {
  const { mode, data } = props

  const CURR_DATE = data.searchParams.date
  const WORKSHOP_ID = data.params.id

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
                institute: true,
                id: true,
                educationalLevel: true,
                instituteName: true,
                dateOfBirth: true,
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

    const ASSIS_NORMAL_STUDENTS = filterAssistances(WORKSHOPS, data)
    const ASSIST_DATES_ITEMS = filterByDate(WORKSHOPS, CURR_DATE)

    if (mode === 'normal') return ASSIS_NORMAL_STUDENTS
    if (mode === 'dates') return ASSIST_DATES_ITEMS

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
