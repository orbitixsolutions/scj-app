'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { InputDate } from '@/components/ui/input-date'
import { DateQueryProps } from '@/components/date-query/date-query.type'
import { parseDate } from '@internationalized/date'
import { useEffect, useMemo } from 'react'
import { getCurrentDate } from '@/helpers/get-current-date'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { AlertCircle, RefreshCcw } from 'lucide-react'
import { TooltipTrigger } from '@radix-ui/react-tooltip'
import { DateInputSkeleton } from '@/components/skeletons'

export function DateQuery(props: DateQueryProps) {
  const { className } = props
  const TODAY_DATE = getCurrentDate()

  const { replace } = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const searchParams = useMemo(() => new URLSearchParams(params), [params])
  const PARAM_DATE = searchParams.get('date')?.toString() ?? ''
  const IS_TODAY = TODAY_DATE === PARAM_DATE

  const handleChange = (value: string | undefined) => {
    if (value) {
      searchParams.set('date', value)
    } else {
      searchParams.delete('date')
    }
    replace(`${pathname}?${searchParams.toString()}`, { scroll: false })
  }

  const handleSetDate = () => handleChange(TODAY_DATE)

  useEffect(() => {
    const date = searchParams.get('date')

    if (!date) {
      searchParams.set('date', TODAY_DATE)
      replace(`${pathname}?${searchParams.toString()}`, { scroll: false })
      return
    }
  }, [TODAY_DATE, searchParams, pathname, replace])

  return (
    <div className='flex items-center gap-1'>
      {!!PARAM_DATE ? (
        <InputDate
          className={cn('flex-1', className)}
          aria-label='Fecha de nacimiento'
          defaultValue={parseDate(PARAM_DATE)}
          value={parseDate(PARAM_DATE)}
          onChange={(value) => handleChange(value?.toString())}
        />
      ) : (
        <DateInputSkeleton />
      )}

      {!!PARAM_DATE && !IS_TODAY && (
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

      {!!PARAM_DATE && !IS_TODAY && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='secondary'
                onClick={handleSetDate}
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
