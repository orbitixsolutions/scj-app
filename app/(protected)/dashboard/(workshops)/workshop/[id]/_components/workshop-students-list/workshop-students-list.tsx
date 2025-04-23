'use client'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { WorkshopStudentsProps } from '@/app/(protected)/dashboard/(workshops)/workshop/[id]/_components/workshop-students-list/workshop-students-list.type'
import { WorkshopStudentItem } from '@/app/(protected)/dashboard/(workshops)/workshop/[id]/_components/workshop-students-item'
import { SearchBar } from '@/components/search-bar'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { CreateStudentForm } from '@/app/(protected)/dashboard/(workshops)/workshop/[id]/_components/create-student-form'

export function WorkshopStudents(props: WorkshopStudentsProps) {
  const { data: STUDENTS } = props

  const NO_STUDENTS = !STUDENTS.length

  const WORKSHOP_STUDENTS_MAPPED = STUDENTS.map((student) => (
    <li key={student.id}>
      <WorkshopStudentItem student={student} />
    </li>
  ))

  return (
    <Card>
      <CardHeader className='space-y-4'>
        <CardTitle className='text-center text-2xl'>Alumnos</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='w-full grid gap-2'>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                size='full'
                className='justify-start'
              >
                <Search />
                Buscar estudiante
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[480px]'>
              <div className='space-y-2'>
                <SearchBar
                  queryParam='firstName'
                  placeholder='Buscar por nombre'
                  className='w-full'
                />
                <SearchBar
                  queryParam='lastName'
                  placeholder='Buscar por apellido'
                  className='w-full'
                />
              </div>
            </PopoverContent>
          </Popover>

          <CreateStudentForm />
        </div>
        {!NO_STUDENTS ? (
          <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {WORKSHOP_STUDENTS_MAPPED}
          </ul>
        ) : (
          <div>
            <p className='opacity-50 text-2xl uppercase font-bold text-center py-20'>
              No se encontraron alumnos
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
