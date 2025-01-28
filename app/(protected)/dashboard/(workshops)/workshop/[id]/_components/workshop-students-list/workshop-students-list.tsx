'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { WorkshopStudentsProps } from '@/app/(protected)/dashboard/(workshops)/workshop/[id]/_components/workshop-students-list/workshop-students-list.type'
import { WorkshopStudentItem } from '@/app/(protected)/dashboard/(workshops)/workshop/[id]/_components/workshop-students-item'
import { SearchBar } from '@/components/search-bar'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export function WorkshopStudents(props: WorkshopStudentsProps) {
  const { data: STUDENTS } = props

  const WORKSHOP_STUDENTS_MAPPED = STUDENTS.map((student, index) => (
    <li key={student.id}>
      <WorkshopStudentItem
        student={student}
        index={index}
      />
    </li>
  ))

  if (!STUDENTS?.length) {
    return (
      <Card className='p-6 space-y-4'>
        <p className='text-center text-xl font-bold'>No hay estudiantes.</p>
        <Button
          size='full'
          asChild
        >
          <Link
            href={'/dashboard/students'}
            className='flex items-center justify-between space-x-4'
          >
            <span>Agregar estudiante</span>
            <Plus />
          </Link>
        </Button>
      </Card>
    )
  }

  return (
    <div className='space-y-4'>
      <SearchBar
        queryParam='name'
        placeholder='Buscar alumno...'
        className='w-full'
      />
      <Card>
        <CardHeader className='space-y-4'>
          <CardTitle className='text-center text-2xl'>Alumnos</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {WORKSHOP_STUDENTS_MAPPED}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
