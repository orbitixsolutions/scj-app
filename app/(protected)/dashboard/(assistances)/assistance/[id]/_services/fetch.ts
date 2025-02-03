import { Prisma } from '@prisma/client'
import { currentRole } from '@/lib/auth'
import db from '@/lib/db'

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
