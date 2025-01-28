'use client'

import { cn } from '@/lib/utils'
import {
  DateField,
  DateInput,
  DateSegment,
  DateValue,
  DateFieldProps,
} from 'react-aria-components'

interface InputDateProps<T extends DateValue> extends DateFieldProps<T> {
  disabled?: boolean
}

export function InputDate<T extends DateValue>({
  disabled,
  ...props
}: InputDateProps<T>) {
  return (
    <DateField
      className={cn(disabled ? 'cursor-not-allowed opacity-50' : 'cursor-text')}
      {...props}
    >
      <DateInput className='relative inline-flex h-9 w-full items-center overflow-hidden whitespace-nowrap rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm shadow-black/5 transition-shadow data-[focus-within]:border-ring data-[disabled]:opacity-50 data-[focus-within]:outline-none data-[focus-within]:ring-[3px] data-[focus-within]:ring-ring/20'>
        {(segment) => (
          <DateSegment
            segment={segment}
            className='inline rounded p-0.5 text-foreground caret-transparent outline outline-0 data-[disabled]:cursor-not-allowed data-[focused]:bg-accent data-[invalid]:data-[focused]:bg-destructive data-[type=literal]:px-0 data-[focused]:data-[placeholder]:text-foreground data-[focused]:text-foreground data-[invalid]:data-[focused]:data-[placeholder]:text-destructive-foreground data-[invalid]:data-[focused]:text-destructive-foreground data-[invalid]:data-[placeholder]:text-destructive data-[invalid]:text-destructive data-[placeholder]:text-muted-foreground/70 data-[type=literal]:text-muted-foreground/70 data-[disabled]:opacity-50'
          />
        )}
      </DateInput>
    </DateField>
  )
}
