import {
  PageProps,
  StudentsProps,
} from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_types'
import { currentRole } from '@/lib/auth'
import db from '@/lib/db'

function formattedDate(date: Date) {
  const [DAY, MONTH, YEAR] = new Date(date)
    .toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .split('/')
  return `${YEAR}-${MONTH}-${DAY}`
}

function filterByDate(students: StudentsProps[], date: string) {
  return students.map((student) => ({
    students: {
      ...student.students,
      assistances: student.students.assistances.filter(
        (s) => formattedDate(s.createdAt) === date
      ),
    },
  }))
}

function filterStudents(students: StudentsProps[], filters: PageProps) {
  const { lastName, name } = filters.searchParams

  return students.filter((student) => {
    const matches = [
      lastName ? student.students.lastName.includes(lastName) : true,
      name ? student.students.name.includes(name) : true,
    ]

    return matches.every(Boolean)
  })
}

type getStudentsProps = {
  mode: 'normal' | 'filter-by-dates'
  page: PageProps
}

export async function getStudents(props: getStudentsProps) {
  const { mode, page } = props

  const SEARCH_PARAMS = page.searchParams.date
  const WORKSHOP_ID = page.params.id

  const ROLE = await currentRole()

  if (ROLE === 'USER' || ROLE === 'TEACHER') {
    return null
  }

  try {
    const WORKSHOP_DATA = await db.workshops.findUnique({
      where: { id: WORKSHOP_ID },
      include: {
        students: {
          orderBy: {
            students: { name: 'asc' },
          },
          select: {
            students: {
              select: {
                lastName: true,
                name: true,
                documentIdentity: true,
                institute: true,
                id: true,
                dateOfBirth: true,
                studyYear: true,
                photo: true,
                assistances: { where: { workshopId: WORKSHOP_ID } },
              },
            },
          },
        },
      },
    })

    if (mode === 'filter-by-dates') {
      const WORKSHOPS = WORKSHOP_DATA?.students as StudentsProps[]
      const WORKSHOP_STUDENTS = filterStudents(WORKSHOPS, page)
      return filterByDate(WORKSHOP_STUDENTS, SEARCH_PARAMS)
    }

    if (mode === 'normal') {
      const STUDENTS = WORKSHOP_DATA?.students
      return STUDENTS as StudentsProps[]
    }

    return null
  } catch {
    return null
  }
}
