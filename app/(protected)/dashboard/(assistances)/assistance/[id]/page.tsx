import { AssistancePageProps } from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_types'
import { getWorkshop } from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_services/fetch'
import { AssistanceView } from './_components/assistance-view'
import { Metadata } from 'next'
import { ContentLayout } from '@/components/content-layout'

export async function generateMetadata(
  props: AssistancePageProps
): Promise<Metadata> {
  const { params } = props
  const WORKSHOP_ID = params.id

  const WORKSHOP = await getWorkshop(WORKSHOP_ID)

  if (!WORKSHOP) return { title: 'Taller - Indefinido' }

  return { title: `Asistencia de alumnos - ${WORKSHOP.name}` }
}

export default async function AssistancePage() {
  return (
    <ContentLayout title='Asistencia'>
      <AssistanceView />
    </ContentLayout>
  )
}
