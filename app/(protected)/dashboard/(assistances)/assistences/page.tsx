import { ContentLayout } from '@/components/content-layout'
import { getWorkshops } from '@/app/(protected)/dashboard/(assistances)/assistences/_services/fetch'
import { WorkshopList } from '@/app/(protected)/dashboard/(assistances)/assistences/_components/workshop-list/workshop-list'
import { Prisma } from '@prisma/client'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Asistencias',
}

type WorkshopsProps = Array<
  Prisma.WorkshopsGetPayload<{
    include: {
      teacher: true
      students: true
    }
  }>
>

export default async function AssistancesPage() {
  const WORKSHOPS = (await getWorkshops()) as WorkshopsProps

  return (
    <ContentLayout title='Asistencias'>
      <header>
        <h2 className='font-bold text-xl'>Asistencias</h2>
      </header>
      <section className='space-y-4'>
        <WorkshopList data={WORKSHOPS} />
      </section>
    </ContentLayout>
  )
}
