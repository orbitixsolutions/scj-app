import { ContentLayout } from '@/components/content-layout'
import { CreateStudentForm } from '@/app/(protected)/dashboard/students/_components/create-student-form'
import { StudentList } from '@/app/(protected)/dashboard/students/_components/student-list'
import { getStudents } from '@/app/(protected)/dashboard/students/_services/fetch'
import { PageProps } from '@/app/(protected)/dashboard/students/_types'
import { StudentFilter } from '@/app/(protected)/dashboard/students/_components/student-filter'
import { Prisma } from '@prisma/client'
import { StudentBatchDelete } from '@/app/(protected)/dashboard/students/_components/student-batch-delete'
import { StudentBatchProvider } from '@/providers/student-batch-provider'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Alumnos',
}

export default async function StudentsPage(props: PageProps) {
  const { searchParams: PARAMS } = props
  
  const STUDENTS = (await getStudents(PARAMS)) as Array<
    Prisma.StudentsGetPayload<{ include: { workshops: true } }>
  >

  return (
    <ContentLayout title='Alumnos'>
      <header className='flex items-center justify-between'>
        <h2 className='font-bold text-xl'>Alumnos</h2>
        <CreateStudentForm />
      </header>
      <StudentBatchProvider>
        <section className='space-y-4'>
          <StudentFilter />
          <StudentList data={STUDENTS} />
        </section>

        <StudentBatchDelete />
      </StudentBatchProvider>
    </ContentLayout>
  )
}
