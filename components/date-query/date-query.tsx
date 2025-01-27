'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { InputDate } from '@/components/ui/input-date'
import { DateQueryProps } from '@/components/date-query/date-query.type'
import { parseDate } from '@internationalized/date'
import { useDebouncedCallback } from 'use-debounce'
import { useEffect, useMemo } from 'react'
import { getCurrentDate } from '@/helpers/get-current-date'
import { cn } from '@/lib/utils'

const DEBOUNCE_TIME = 500

export function DateQuery(props: DateQueryProps) {
  const { className } = props

  const { replace } = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const CURRENT_DATE = getCurrentDate()
  const searchParams = useMemo(() => new URLSearchParams(params), [params])

  const handleChange = useDebouncedCallback((value: string | undefined) => {
    if (value) {
      searchParams.set('date', value)
    } else {
      searchParams.delete('date')
    }
    replace(`${pathname}?${searchParams.toString()}`, { scroll: false })
  }, DEBOUNCE_TIME)

  useEffect(() => {
    const date = searchParams.get('date')
    const IS_TODAY = getCurrentDate() === date

    if (!date || !IS_TODAY) {
      searchParams.set('date', CURRENT_DATE)
      replace(`${pathname}?${searchParams.toString()}`, { scroll: false })
      return
    }
  }, [CURRENT_DATE, searchParams, pathname, replace])

  return (
    <div className='flex items-center space-x-3'>
      <p>Buscar por fecha</p>
      <InputDate
        className={cn('flex-1', className)}
        aria-label='Fecha de nacimiento'
        defaultValue={parseDate(CURRENT_DATE)}
        onChange={(value) => handleChange(value?.toString())}
      />
    </div>
  )
}
