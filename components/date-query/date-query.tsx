'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { InputDate } from '../ui/input-date'
import { DateQueryProps } from './date-query.type'
import { parseDate } from '@internationalized/date'
import { useDebouncedCallback } from 'use-debounce'
import { cn } from '@/lib/utils'
import { useEffect, useMemo } from 'react'

const DEBOUNCE_TIME = 500

function getCurrentDate() {
  const [DAY, MONTH, YEAR] = new Date()
    .toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .split('/')

  return `${YEAR}-${MONTH}-${DAY}`
}

export function DateQuery(props: DateQueryProps) {
  const { className } = props

  const { replace } = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const FORMATTED_DATE = getCurrentDate()
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

    if (!date) {
      searchParams.set('date', FORMATTED_DATE)
      replace(`${pathname}?${searchParams.toString()}`, { scroll: false })
      return
    }
  }, [searchParams, FORMATTED_DATE, replace, pathname])

  return (
    <div className='flex items-center space-x-3'>
      <p>Buscar por fecha</p>
      <InputDate
        className={cn('flex-1', className)}
        aria-label='Fecha de nacimiento'
        defaultValue={parseDate(FORMATTED_DATE)}
        onChange={(value) => handleChange(value?.toString())}
      />
    </div>
  )
}
