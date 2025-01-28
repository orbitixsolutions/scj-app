import { DateQuery } from '@/components/date-query'
import { Loader } from 'lucide-react'
import { Suspense } from 'react'

export function AbsentFilter() {
  return (
    <div className='grid grid-cols-3 gap-4'>
      <Suspense fallback={<Loader className='animate-spin' />}>
        <DateQuery />
      </Suspense>
    </div>
  )
}
