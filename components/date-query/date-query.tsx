'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { InputDate } from '@/components/ui/input-date'
import { DateQueryProps } from '@/components/date-query/date-query.type'
import { parseDate } from '@internationalized/date'
import { useEffect, useMemo, useState } from 'react'
import { getCurrentDate } from '@/helpers/get-current-date'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { AlertCircle, RefreshCcw } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip'
import { TooltipTrigger } from '@radix-ui/react-tooltip'

export function DateQuery(props: DateQueryProps) {
  const { className } = props
  const CURRENT_DATE = getCurrentDate()

  const [nowDate, setNowDate] = useState(parseDate(CURRENT_DATE))
  const { replace } = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const searchParams = useMemo(() => new URLSearchParams(params), [params])

  const IS_TODAY = CURRENT_DATE === searchParams.get('date')?.toString()

  const handleChange = (value: string | undefined) => {
    if (value) {
      searchParams.set('date', value)
      setNowDate(parseDate(value))
    } else {
      searchParams.delete('date')
    }
    replace(`${pathname}?${searchParams.toString()}`, { scroll: false })
  }

  const handleCurrentDay = () => {
    searchParams.set('date', CURRENT_DATE)
    replace(`${pathname}?${searchParams.toString()}`, { scroll: false })
    setNowDate(parseDate(CURRENT_DATE))
  }

  useEffect(() => {
    const date = searchParams.get('date')

    if (!date) {
      searchParams.set('date', CURRENT_DATE)
      replace(`${pathname}?${searchParams.toString()}`, { scroll: false })
      return
    }
  }, [CURRENT_DATE, searchParams, pathname, replace])

  return (
    <div className='flex items-center gap-1'>
      <InputDate
        className={cn('flex-1', className)}
        aria-label='Fecha de nacimiento'
        value={nowDate}
        onChange={(value) => handleChange(value?.toString())}
      />

      {!IS_TODAY && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='destructive'
                size='sm-icon'
              >
                <AlertCircle />
              </Button>
            </TooltipTrigger>
            <TooltipContent side='bottom'>
              <p>¡Estas viendo un día pasado!</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {!IS_TODAY && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleCurrentDay}
                variant='secondary'
                size='sm-icon'
              >
                <RefreshCcw />
              </Button>
            </TooltipTrigger>
            <TooltipContent side='bottom'>
              <p>Ir al día actual</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  )
}
