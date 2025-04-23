import { currentRole, currentUser } from '@/lib/auth'
import { db } from '@/lib/db'

export async function getWorkshops() {
  const [ROLE, USER] = await Promise.all([currentRole(), currentUser()])

  if (ROLE === 'STUDENT') {
    return null
  }

  const USER_ID = USER?.id

  if (ROLE === 'EDUCATOR') {
    const WORKSHOPS = await db.workshops.findMany({
      where: { teacherId: USER_ID },
      include: { teacher: true, students: true },
    })

    return WORKSHOPS
  }

  try {
    const WORKSHOPS = await db.workshops.findMany({
      include: { teacher: true, students: true },
    })

    return WORKSHOPS
  } catch {
    return null
  }
}
