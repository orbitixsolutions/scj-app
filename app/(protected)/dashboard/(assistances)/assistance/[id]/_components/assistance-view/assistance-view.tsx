'use client'

import { StudentsProps } from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_types'
import { AssistanceDataTable } from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_components/assistance-table'
import { AssistanceMenu } from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_components/assistance-menu'
import { assistanceColumns } from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_components/assistance-table/assistance.column'
import { ChevronLeft, Loader2 } from 'lucide-react'
import { useFetch } from '@/hooks/use-fetch'
import { useParams, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import Link from 'next/link'

const API_URL = `/api/v0/dashboard/assistances/id`

export function AssistanceView() {
  const { id: WORKSHOP_ID } = useParams<{ id: string }>()

  const params = useSearchParams()
  const searchParams = useMemo(() => new URLSearchParams(params), [params])

  const CURRENT_DATE = searchParams.get('date')?.toString()

  const { data: NORMAL_ASSIS, status: NORMAL_ASSIS_STATUS } = useFetch(
    `${API_URL}/${WORKSHOP_ID}?date=${CURRENT_DATE}&mode=normal`
  )

  const { data: ASSIS_DATES, status: NORMAL_ASSIS_DATES } = useFetch(
    `${API_URL}/${WORKSHOP_ID}?date=${CURRENT_DATE}&mode=filter-by-dates`
  )

  console.log(ASSIS_DATES)

  if (NORMAL_ASSIS_STATUS === 'pending' && NORMAL_ASSIS_DATES === 'pending') {
    return <Loader2 className='animate-spin' />
  }

  if (NORMAL_ASSIS_STATUS === 'error' && NORMAL_ASSIS_DATES === 'error') {
    return null
  }
  
  return (
    <>
      <header>
        <Link
          href={`/dashboard/assistences`}
          className='text-primary flex items-center space-x-2 hover:underline'
        >
          <ChevronLeft />
          <h2 className='font-bold text-xl'>Asistencia</h2>
        </Link>
      </header>
      <section className='space-y-4'>
        <AssistanceMenu data={(NORMAL_ASSIS as StudentsProps[]) ?? []} />

        <AssistanceDataTable
          columns={assistanceColumns}
          data={(ASSIS_DATES as StudentsProps[]) ?? []}
        />
      </section>
    </>
  )
}
