import { ContentLayout } from '@/components/content-layout'
import { PAGE_NAME } from '@/constants'
import { Metadata } from 'next'
import { Card } from '@/components/ui/card'
import { getCurrentDate } from '@/helpers/get-current-date'
import { InitialListDataTable } from '@/app/(protected)/dashboard/initial-list/_components/initial-list-table'
import { StudentColumns } from '@/app/(protected)/dashboard/initial-list/_components/initial-list-table/initial-list.column'
import { getInitialList } from '@/app/(protected)/dashboard/initial-list/_services/fetch'

export const metadata: Metadata = {
  title: `${PAGE_NAME} - Lista inicial`,
}

const CURRENT_DATE = getCurrentDate().split('-').join('/')

export default async function InitialList() {
  const STUDENTS = await getInitialList()

  return (
    <ContentLayout title='Lista inicial'>
      <header className='flex flex-col space-y-4'>
        <h2 className='font-bold text-xl'>Alumnos</h2>

        <p className='text-sm opacity-70'>
          La lista inicial sirve para comparar las asistencias de los
          estudiantes en el taller con el de la institución.
        </p>
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
