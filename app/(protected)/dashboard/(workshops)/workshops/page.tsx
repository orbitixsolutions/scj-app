import { ContentLayout } from '@/components/content-layout'
import { CreateWorkshopForm } from '@/app/(protected)/dashboard/(workshops)/workshops/_components/create-workshop-form'
import { WorkshopList } from '@/app/(protected)/dashboard/(workshops)/workshops/_components/workshop-list'
import { getWorkshops } from '@/app/(protected)/dashboard/(workshops)/workshops/_services/fetch'
import { WorkshopFilter } from '@/app/(protected)/dashboard/(workshops)/workshops/_components/workshop-filter'
import { Prisma } from '@prisma/client'
import { WorkshopPageProps } from '@/app/(protected)/dashboard/(workshops)/workshops/_types'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Talleres',
}

export default async function WorkshopPage(props: WorkshopPageProps) {
  const { searchParams: PARAMS } = props

  const WORKSHOPS = (await getWorkshops(PARAMS)) as Array<
    Prisma.WorkshopsGetPayload<{
      include: {
        teacher: true
        students: true
      }
    }>
  >

  return (
    <ContentLayout title='Talleres'>
      <header className='flex items-center justify-between'>
        <h2 className='font-bold text-xl'>Talleres</h2>
        <CreateWorkshopForm />
      </header>
      <section className='space-y-4'>
        <WorkshopFilter />
        <WorkshopList data={WORKSHOPS} />
      </section>
    </ContentLayout>
  )
}
