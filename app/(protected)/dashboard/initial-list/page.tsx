import { ContentLayout } from '@/components/content-layout'
import { Card } from '@/components/ui/card'
import { getCurrentDate } from '@/helpers/get-current-date'
import { InitialListDataTable } from '@/app/(protected)/dashboard/initial-list/_components/initial-list-table'
import { StudentColumns } from '@/app/(protected)/dashboard/initial-list/_components/initial-list-table/initial-list.column'
import { getInitialList } from '@/app/(protected)/dashboard/initial-list/_services/fetch'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lista inicial',
}

const CURRENT_DATE = getCurrentDate().split('-').join('/')

export default async function InitialList() {
  const STUDENTS = await getInitialList()

  return (
    <ContentLayout title='Lista inicial'>
      <header>
        <h2 className='font-bold text-xl'>Alumnos</h2>
      </header>

      <section className='space-y-4'>
        <Card className='p-6'>
          <p className='text-2xl font-light opacity-70 text-center'>
            {CURRENT_DATE}
          </p>
        </Card>

        <InitialListDataTable
          columns={StudentColumns}
          data={STUDENTS ?? []}
        />
      </section>
    </ContentLayout>
  )
}
