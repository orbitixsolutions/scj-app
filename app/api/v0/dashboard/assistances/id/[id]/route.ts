import { WorkshopsProps } from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_types'
import { NextResponse, type NextRequest } from 'next/server'
import { formatDateToString } from '@/helpers/get-current-date'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

type QueryData = {
  CURR_DATE: string
  MODE: string
  NAME: string
  LAST_NAME: string
}

function filterAssistances(data: WorkshopsProps, filters: QueryData) {
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

function filterByDate(data: WorkshopsProps, currDate: string) {
  const STUDENTS = data.students

  return STUDENTS.map(({ student }) => ({
    ...student,
    assistances: student.assistances.filter((item) => {
      return formatDateToString(item.date) === formatDateToString(currDate)
    }),
  }))
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
                institute: true,
                id: true,
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

    if (!WORKSHOPS) return NextResponse.json({ error: null }, { status: 500 })

    if (QUERY_DATA.MODE === 'normal') {
      const ITEMS = filterAssistances(WORKSHOPS, QUERY_DATA)
      return NextResponse.json(ITEMS, { status: 201 })
    }

    if (QUERY_DATA.MODE === 'all') {
      return NextResponse.json(WORKSHOPS.students, { status: 201 })
    }

    if (QUERY_DATA.MODE === 'dates') {
      const ITEMS = filterByDate(WORKSHOPS, QUERY_DATA.CURR_DATE)
      return NextResponse.json(ITEMS, { status: 201 })
    }

    return NextResponse.json({ error: null }, { status: 500 })
  } catch {
    return NextResponse.json({ error: null }, { status: 500 })
  }
}
