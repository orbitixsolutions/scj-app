import { currentRole } from '@/lib/auth'
import { Absents } from '@prisma/client'
import { AbsentProps } from '@/app/(protected)/dashboard/absents/_types'
import { formatDateToString } from '@/helpers/get-current-date'
import db from '@/lib/db'

function filterAbsents(abensts: Absents[], filters: AbsentProps) {
  const { date } = filters
  return abensts.filter((item) => formatDateToString(item.date) === date)
}

export async function getAbsents(props: AbsentProps) {
  const ROLE = await currentRole()

  if (ROLE === 'TEACHER') return null

  try {
    const ABSENTS = await db.absents.findMany()
    const FILTERED_ABSENTS = filterAbsents(ABSENTS, props)
    return FILTERED_ABSENTS as Absents[]
  } catch {
    return null
  }
}
