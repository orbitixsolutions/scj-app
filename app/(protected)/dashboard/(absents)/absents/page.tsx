import { ContentLayout } from '@/components/content-layout'
import { Prisma } from '@prisma/client'
import { Metadata } from 'next'
import { AbsentList } from '@/app/(protected)/dashboard/(absents)/absents/_components/absent-list'
import { getWorkshops } from '@/app/(protected)/dashboard/(absents)/absents/_services/fetch'

export const metadata: Metadata = {
  title: 'Ausencias',
}

type WorkshopsProps = Array<
  Prisma.WorkshopsGetPayload<{
    include: {
      teacher: true
      students: true
    }
  }>
>

export default async function AbsentsPage() {
  const WORKSHOPS = (await getWorkshops()) as WorkshopsProps

  return (
    <ContentLayout title='Ausencias'>
      <header>
        <h2 className='font-bold text-xl'>Ausencias</h2>
      </header>
      <section className='space-y-4'>
        <AbsentList data={WORKSHOPS} />
      </section>
    </ContentLayout>
  )
}
