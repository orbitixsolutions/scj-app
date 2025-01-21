import { currentRole } from '@/lib/auth'
import db from '@/lib/db'

export async function getWorkshops() {
  const ROLE = await currentRole()

  if (ROLE === 'STUDENT' || ROLE === 'TEACHER') {
    return null
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
