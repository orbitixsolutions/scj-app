import {
  AssistancePageProps,
  StudentsProps,
} from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_types'
import {
  getAssistances,
  getWorkshop,
} from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_services/fetch'
import { ContentLayout } from '@/components/content-layout'
import { AssistanceDataTable } from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_components/assistance-table'
import { AssistanceMenu } from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_components/assistance-menu'
import { assistanceColumns } from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_components/assistance-table/assistance.column'
import { ChevronLeft } from 'lucide-react'
import { Metadata } from 'next'
import { RefreshButton } from '@/components/refresh-button'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export async function generateMetadata(
  props: AssistancePageProps
): Promise<Metadata> {
  const { params } = props
  const WORKSHOP_ID = params.id

  const WORKSHOP = await getWorkshop(WORKSHOP_ID)

  if (!WORKSHOP) return { title: 'Taller - Indefinido' }

  return { title: `Asistencia de alumnos - ${WORKSHOP?.name}` }
}

export default async function AssistancePage(props: AssistancePageProps) {
  const { params } = props
  const WORKSHOP_ID = params.id

  const [ASSIS_NORMAL_STUDENTS, ASSIS_DATES_STUDENTS, WORKSHOP] =
    await Promise.all([
      getAssistances({ mode: 'normal', page: props }),
      getAssistances({ mode: 'dates', page: props }),
      getWorkshop(WORKSHOP_ID),
    ])

  return (
    <ContentLayout title='Asistencia'>
      <header className='flex items-center justify-between'>
        <Link
          href={`/dashboard/assistences`}
          className='text-primary flex items-center space-x-2 hover:underline'
        >
          <ChevronLeft />
          <h2 className='font-bold text-xl'>Asistencias - {WORKSHOP?.name}</h2>
        </Link>
        <RefreshButton />
      </header>
      <section className='space-y-4'>
        <AssistanceMenu
          data={(ASSIS_NORMAL_STUDENTS as StudentsProps[]) ?? []}
        />

        <AssistanceDataTable
          columns={assistanceColumns}
          data={(ASSIS_DATES_STUDENTS as StudentsProps[]) ?? []}
        />
      </section>
    </ContentLayout>
  )
}
