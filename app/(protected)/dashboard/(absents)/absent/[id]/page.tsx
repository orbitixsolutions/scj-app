import { Metadata } from 'next'
import { ContentLayout } from '@/components/content-layout'
import { RefreshButton } from '@/components/refresh-button'
import { AbsentPageProps } from '@/app/(protected)/dashboard/(absents)/absent/[id]/_types'
import { getWorkshop } from '@/app/(protected)/dashboard/(absents)/absent/[id]/_services/fetch'
import { getAbsents } from '@/app/(protected)/dashboard/(absents)/absent/[id]/_services/fetch'
import { AbsentDataTable } from '@/app/(protected)/dashboard/(absents)/absent/[id]/_components/absent-table'
import { AbsentFilter } from '@/app/(protected)/dashboard/(absents)/absent/[id]/_components/absent-filter'
import { absentColumns } from '@/app/(protected)/dashboard/(absents)/absent/[id]/_components/absent-table/absent.column'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export async function generateMetadata(
  props: AbsentPageProps
): Promise<Metadata> {
  const { params } = props
  const WORKSHOP_ID = params.id

  const WORKSHOP = await getWorkshop(WORKSHOP_ID)

  if (!WORKSHOP) return { title: 'Taller - Indefinido' }

  return { title: `Tabla de ausencias - ${WORKSHOP.name}` }
}

export default async function AbsentsPage(props: AbsentPageProps) {
  const { searchParams, params } = props
  const WORKSHOP_ID = params.id

  const [WORKSHOP, ABSENTS] = await Promise.all([
    getWorkshop(WORKSHOP_ID),
    getAbsents(searchParams, params),
  ])

  return (
    <ContentLayout title={`Ausencia - ${WORKSHOP?.name}`}>
      <header className='flex items-center justify-between'>
        <Link
          href={`/dashboard/assistences`}
          className='text-primary flex items-center space-x-2 hover:underline'
        >
          <ChevronLeft />
          <h2 className='font-bold text-xl'>
            Tabla de ausencias - {WORKSHOP?.name}
          </h2>
        </Link>
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
