import { currentRole } from '@/lib/auth'
import { StudentActionProps } from '@/app/(protected)/dashboard/students/_types'
import { Students } from '@prisma/client'
import { db } from '@/lib/db'

function filterStudents(students: Students[], filters: StudentActionProps) {
  const { firstName, lastName, educational_level, liceo } = filters

  return students.filter((student) => {
    const matcher = [
      firstName
        ? student.name.toLowerCase().includes(firstName.toLowerCase())
        : true,
      lastName
        ? student.lastName.toLowerCase().includes(lastName.toLowerCase())
        : true,
      educational_level ? student.educationalLevel === educational_level : true,
      liceo ? student.institute.includes(liceo) : true,
    ]

    return matcher.every(Boolean)
  })
}

export async function getStudents(props: StudentActionProps) {
  const ROLE = await currentRole()
  if (ROLE === 'STUDENT') return null

  try {
    const STUDENTS = await db.students.findMany({
      include: {
        workshops: true,
      },
      orderBy: [{ createdAt: 'desc' }, { name: 'asc' }],
    })

    const FILTERED_STUDENTS = filterStudents(STUDENTS, props)

    return FILTERED_STUDENTS
  } catch {
    return null
  }
}
