'use client'

import { Card } from '@/components/ui/card'
import { getCurrentDate } from '@/helpers/get-current-date'

export function CurrentDate() {
  const CURRENT_DATE = getCurrentDate().split('-').join('/')

  return (
    <Card className='p-6'>
      <p className='text-2xl font-light opacity-70 text-center'>
        {CURRENT_DATE}
      </p>
    </Card>
  )
}
