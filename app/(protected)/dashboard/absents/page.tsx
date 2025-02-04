import { ContentLayout } from '@/components/content-layout'
import { getAbsents } from '@/app/(protected)/dashboard/absents/_services/fetch'
import { AbsentDataTable } from '@/app/(protected)/dashboard/absents/_components/absent-table'
import { absentColumns } from '@/app/(protected)/dashboard/absents/_components/absent-table/absent.column'
import { AbsentFilter } from '@/app/(protected)/dashboard/absents/_components/absent-filter'
import { PageProps } from '@/app/(protected)/dashboard/absents/_types'
import { Metadata } from 'next'
import { RefreshButton } from '@/components/refresh-button'

export const metadata: Metadata = {
  title: 'Lista de ausentes',
}

export default async function AbsentsPage(props: PageProps) {
  const { searchParams: PARAMS } = props
  const ABSENTS = await getAbsents(PARAMS)

  return (
    <ContentLayout title='Ausencias'>
      <header className='flex items-center justify-between'>
        <h2 className='font-bold text-xl'>Tabla de Ausencias</h2>
        <RefreshButton />
      </header>

      <section className='space-y-4'>
        <AbsentFilter />

        <AbsentDataTable
          columns={absentColumns}
          data={ABSENTS ?? []}
        />
      </section>
    </ContentLayout>
  )
}
