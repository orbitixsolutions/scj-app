import { ContentLayout } from '@/components/content-layout'
import { InitialListDataTable } from '@/app/(protected)/dashboard/initial-list/_components/initial-list-table'
import { StudentColumns } from '@/app/(protected)/dashboard/initial-list/_components/initial-list-table/initial-list.column'
import { getInitialList } from '@/app/(protected)/dashboard/initial-list/_services/fetch'
import { CurrentDate } from '@/app/(protected)/dashboard/initial-list/_components/current-date'
import { PageProps } from '@/app/(protected)/dashboard/initial-list/_types'
import { StudentFilter } from '@/app/(protected)/dashboard/initial-list/_components/student-filter'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lista inicial',
}

export default async function InitialList(props: PageProps) {
  const { searchParams: PARAMS } = props
  const STUDENTS = await getInitialList(PARAMS)

  return (
    <ContentLayout title='Lista inicial'>
      <header>
        <h2 className='font-bold text-xl'>Alumnos</h2>
      </header>

      <section className='space-y-4'>
        <CurrentDate/>

        <StudentFilter />

        <InitialListDataTable
          columns={StudentColumns}
          data={STUDENTS ?? []}
        />
      </section>
    </ContentLayout>
  )
}
