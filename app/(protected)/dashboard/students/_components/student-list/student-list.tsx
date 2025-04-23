'use client'

import { StudentItem } from '@/app/(protected)/dashboard/students/_components/student-item'
import { StudentListProps } from '@/app/(protected)/dashboard/students/_components/student-list/student-list.type'
import { useCurrentRole } from '@/hooks/use-session'
import { useStudentBatch } from '@/providers/student-batch-provider'

export function StudentList(props: StudentListProps) {
  const { data: STUDENTS } = props
  const { onDeleting } = useStudentBatch()
  const ROLE = useCurrentRole()

  const toggleDelete = () => {
    if (ROLE === 'STUDENT' || ROLE === 'EDUCATOR') return
    onDeleting(true)
  }

  const MAPPED_STUDENTS = STUDENTS.map((student) => (
    <li
      key={student.id}
      className='relative group/item overflow-hidden'
      onDoubleClick={toggleDelete}
    >
      <StudentItem student={student} />
    </li>
  ))

  if (!STUDENTS.length) {
    return (
      <div className='flex h-full min-h-[calc(100svh_-_20rem)] w-full flex-col items-center justify-center'>
        <p className='text-center font-bold text-6xl opacity-60'>
          No hay alumnos.
        </p>
      </div>
    )
  }

  return (
    <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {MAPPED_STUDENTS}
    </ul>
  )
}
