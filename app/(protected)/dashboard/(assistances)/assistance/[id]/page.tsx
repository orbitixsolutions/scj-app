import { ContentLayout } from '@/components/content-layout'
import { AssistanceDataTable } from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_components/assistance-table'
import { assistanceColumns } from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_components/assistance-table/assistance.column'
import { PageProps } from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_types'
import { getStudents } from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_services/fetch'
import { AssistanceMenu } from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_components/assistance-menu'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default async function AssistancePage(props: PageProps) {
  const [NSTUDENTS, FSTUDENTS] = await Promise.all([
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
        <AssistanceMenu data={NSTUDENTS ?? []} />

        <AssistanceDataTable
          columns={assistanceColumns}
          data={FSTUDENTS ?? []}
        />
      </section>
    </ContentLayout>
  )
}
