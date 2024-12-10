import { currentRole } from '@/lib/auth'
import { StudentActionProps } from '@/app/(protected)/dashboard/students/_types'
import db from '@/lib/db'

export async function getStudents(props: StudentActionProps) {
  const { name } = props

  const ROLE = await currentRole()

  if (ROLE === 'STUDENT' || ROLE === 'TEACHER') {
    return null
  }

  if (name) {
    const STUDENTS = await db.students.findMany({
      where: {
        ...(name && {
          name: { contains: name, mode: 'insensitive' },
        }),
      },
      orderBy: [{ createdAt: 'desc' }, { name: 'asc' }],
    })

    return STUDENTS
  }

  try {
    const STUDENTS = await db.students.findMany({
      orderBy: [{ createdAt: 'desc' }, { name: 'asc' }],
    })

    return STUDENTS
  } catch {
    return null
  }
}
