import { currentRole } from '@/lib/auth'
import { Absents, Prisma } from '@prisma/client'
import { formatDateToString } from '@/helpers/get-current-date'
import { AbsentParamProps, AbsentProps } from '../_types'
import db from '@/lib/db'

function filterAbsents(abensts: Absents[], filters: AbsentProps) {
  const { date } = filters
  return abensts.filter((item) => {
    const matcher = [
      date ? formatDateToString(item.date) === formatDateToString(date) : true,
    ]

    return matcher.every(Boolean)
  })
}

export async function getWorkshop(id: string) {
  const ROLE = await currentRole()
  if (ROLE !== 'DIRECTIVE') return null

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

export async function getAbsents(props: AbsentProps, params: AbsentParamProps) {
  const { id } = params
  
  const ROLE = await currentRole()
  if (ROLE !== 'DIRECTIVE') return null

  try {
    const ABSENTS = await db.absents.findMany({
      where: { workshopId: id },
    })

    const FILTERED_ABSENTS = filterAbsents(ABSENTS, props)
    return FILTERED_ABSENTS as Absents[]
  } catch {
    return null
  }
}
