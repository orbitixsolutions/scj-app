import { WorkshopsProps } from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_types'
import { NextResponse, type NextRequest } from 'next/server'
import { formatDateToString } from '@/helpers/get-current-date'
import db from '@/lib/db'

export const dynamic = 'force-dynamic'

type QueryData = {
  CURR_DATE: string
  MODE: string
  NAME: string
  LAST_NAME: string
}

function filterByDate(data: WorkshopsProps, currDate: string) {
  const STUDENTS = data.students

  return STUDENTS.map(({ student }) => ({
    ...student,
    assistances: student.assistances.filter((item) => {
      return formatDateToString(item.date) === currDate
    }),
  }))
}

function filterStudents(data: WorkshopsProps, filters: QueryData) {
  const { LAST_NAME, NAME } = filters
  const STUDENTS = data.students.map(({ student }) => ({ ...student }))

  return STUDENTS.filter((item) => {
    const matcher = [
      NAME ? item.name.includes(NAME) : true,
      LAST_NAME ? item.lastName.includes(LAST_NAME) : true,
    ]
    return matcher.every(Boolean)
  })
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const searchParams = req.nextUrl.searchParams

  const QUERY_DATA: QueryData = {
    CURR_DATE: searchParams.get('date')?.toString() ?? '',
    MODE: searchParams.get('mode')?.toString() ?? '',
    NAME: searchParams.get('name')?.toString() ?? '',
    LAST_NAME: searchParams.get('lastName')?.toString() ?? '',
  }

  const WORKSHOP_ID = params.id

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
    if (QUERY_DATA.MODE === 'normal') {
      return NextResponse.json(filterStudents(WORKSHOPS, QUERY_DATA), {
        status: 201,
      })
    }

    if (QUERY_DATA.MODE === 'filter-by-dates') {
      return NextResponse.json(filterByDate(WORKSHOPS, QUERY_DATA.CURR_DATE), {
        status: 201,
      })
    }

    return NextResponse.json({ error: null }, { status: 500 })
  } catch {
    return NextResponse.json({ error: null }, { status: 500 })
  }
}
