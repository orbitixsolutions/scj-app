import { ContentLayout } from '@/components/content-layout'
import { WorkshopPageProps } from '@/app/(protected)/dashboard/(workshops)/workshop/[id]/_types'
import { ChevronLeft } from 'lucide-react'
import {
  getStudents,
  getWorkshop,
} from '@/app/(protected)/dashboard/(workshops)/workshop/[id]/_services/fetch'
import { WorkshopAsigmentStudentsList } from '@/app/(protected)/dashboard/(workshops)/workshop/[id]/_components/workshop-asigment-students-list'
import { redirect } from 'next/navigation'
import { WorkshopStudents } from '@/app/(protected)/dashboard/(workshops)/workshop/[id]/_components/workshop-students-list'
import { Metadata } from 'next'
import Link from 'next/link'

export async function generateMetadata(
  props: WorkshopPageProps
): Promise<Metadata> {
  const { params } = props
  const WORKSHOP_ID = params.id

  const WORKSHOP = await getWorkshop(WORKSHOP_ID)

  if (!WORKSHOP) return { title: 'Taller - Indefinido' }

  return { title: `Taller - ${WORKSHOP.name}` }
}

export default async function WorkshopPage(props: WorkshopPageProps) {
  const { params, searchParams: PARAMS } = props
  const WORKSHOP_ID = params.id

  const WORKSHOP = await getWorkshop(WORKSHOP_ID)
  const STUDENTS = await getStudents(WORKSHOP_ID, PARAMS)

  if (!WORKSHOP || !STUDENTS) return redirect('/dashboard/workshops')

  return (
    <ContentLayout title={`Taller - ${WORKSHOP.name}`}>
      <header className='flex justify-start'>
        <Link
          href={`/dashboard/workshops`}
          className='text-primary text-sm flex items-center space-x-2 hover:underline'
        >
          <ChevronLeft />
          <span>Volver a la lista de talleres</span>
        </Link>
      </header>
      <section className='w-full grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <WorkshopAsigmentStudentsList data={WORKSHOP} />
        <WorkshopStudents data={STUDENTS} />
      </section>
    </ContentLayout>
  )
}
