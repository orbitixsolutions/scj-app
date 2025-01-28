import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { DaySelectorProps } from '@/components/day-selector/day-selector.type'
import { getDayName } from '@/helpers/get-day-name'
import { SELECT_DAYS } from '@/constants'
import { cn } from '@/lib/utils'

export function DaySelector(props: DaySelectorProps) {
  const { value, onChange, disabled } = props

  return (
    <div className='w-full mx-auto'>
      <ToggleGroup
        type='multiple'
        value={value}
        onValueChange={onChange}
        className='justify-between'
        disabled={disabled}
      >
        {SELECT_DAYS.slice(0, 7).map((day) => (
          <ToggleGroupItem
            size='sm'
            variant='outline'
            key={day}
            value={day}
            className={cn(
              value.find((v) => v === day) &&
                '!bg-primary !text-primary-foreground'
            )}
          >
            {getDayName(day)}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  )
}
