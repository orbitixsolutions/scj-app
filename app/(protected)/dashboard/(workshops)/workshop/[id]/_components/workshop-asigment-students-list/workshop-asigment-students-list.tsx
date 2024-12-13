import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { WorkshopAsigmentStudentsProps } from '@/app/(protected)/dashboard/(workshops)/workshop/[id]/_components/workshop-asigment-students-list/workshop-asigment-students-list.type'
import { WorkshopAsigmentStudentsItem } from '@/app/(protected)/dashboard/(workshops)/workshop/[id]/_components/workshop-asigment-students-item'
import { Suspense } from 'react'
import { Loader } from 'lucide-react'

export function WorkshopAsigmentStudentsList(
  props: WorkshopAsigmentStudentsProps
) {
  const { data: WORKSHOP } = props

  const STUDENTS_ASIGNED_MAPPED = WORKSHOP.students.map((student, index) => (
    <li key={student.id}>
      <Suspense fallback={<LoaderComponent />}>
        <WorkshopAsigmentStudentsItem
          student={student}
          index={index}
        />
      </Suspense>
    </li>
  ))

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-center text-2xl'>
          Alumnos asignados
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {STUDENTS_ASIGNED_MAPPED}
        </ul>
      </CardContent>
    </Card>
  )
}

function LoaderComponent() {
  return (
    <Card className='p-4'>
      <Loader className='animate-spin size-9' />
    </Card>
  )
}
