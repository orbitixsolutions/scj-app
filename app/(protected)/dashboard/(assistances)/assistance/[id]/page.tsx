import {
  PageProps,
  StudentsProps,
} from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_types'
import { ContentLayout } from '@/components/content-layout'
import { AssistanceDataTable } from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_components/assistance-table'
import { AssistanceMenu } from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_components/assistance-menu'
import { assistanceColumns } from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_components/assistance-table/assistance.column'
import { getStudents } from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_services/fetch'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AssistancePage(props: PageProps) {
  const [NORMAL_STUDENTS, DATES_STUDENTS] = await Promise.all([
    getStudents({ mode: 'normal', page: props }),
    getStudents({ mode: 'filter-by-dates', page: props }),
  ])

  return (
    <ContentLayout title='Asistencia'>
      <header>
        <Link
          href={`/dashboard/assistences`}
          className='text-primary flex items-center space-x-2 hover:underline'
        >
          <ChevronLeft />
          <h2 className='font-bold text-xl'>Asistencia</h2>
        </Link>
      </header>
      <section className='space-y-4'>
        <AssistanceMenu data={(NORMAL_STUDENTS as StudentsProps[]) ?? []} />

        <AssistanceDataTable
          columns={assistanceColumns}
          data={(DATES_STUDENTS as StudentsProps[]) ?? []}
        />
      </section>
    </ContentLayout>
  )
}
