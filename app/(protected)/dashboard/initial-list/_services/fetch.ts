import { currentRole } from '@/lib/auth'
import db from '@/lib/db'

export async function getInitialList() {
  const ROLE = await currentRole()

  if (ROLE === 'STUDENT' || ROLE === 'TEACHER') {
    return null
  }

  try {
    const STUDENTS = await db.students.findMany({
      include: { initialAssistances: true },
      where: { institute: 'LOS_PINOS' },
    })

    return STUDENTS
  } catch {
    return null
  }
}
