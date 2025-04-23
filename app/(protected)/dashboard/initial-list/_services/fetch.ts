import { db } from '@/lib/db'
import { currentRole } from '@/lib/auth'
import { Prisma } from '@prisma/client'
import { StudentActionProps } from '@/app/(protected)/dashboard/initial-list/_types'

export type Students = Prisma.StudentsGetPayload<{
  include: { initialAssistances: true }
}>

function filterStudents(students: Students[], filters: StudentActionProps) {
  const { firstName, lastName, educational_level } = filters

  return students.filter((student) => {
    const matcher = [
      firstName
        ? student.name.toLowerCase().includes(firstName.toLowerCase())
        : true,
      lastName
        ? student.lastName.toLowerCase().includes(lastName.toLowerCase())
        : true,
      educational_level ? student.educationalLevel === educational_level : true,
    ]

    return matcher.every(Boolean)
  })
}

export async function getInitialList(props: StudentActionProps) {
  const ROLE = await currentRole()

  if (ROLE === 'STUDENT' || ROLE === 'EDUCATOR') {
    return null
  }

  try {
    const STUDENTS = await db.students.findMany({
      include: { initialAssistances: true },
      where: { institute: 'LOS_PINOS' },
      orderBy: [{ name: 'asc' }, { createdAt: 'asc' }],
    })

    const FILTERED_STUDENTS = filterStudents(STUDENTS, props)

    return FILTERED_STUDENTS
  } catch {
    return null
  }
}
