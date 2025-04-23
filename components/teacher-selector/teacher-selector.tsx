'use client'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Button } from '@/components/ui/button'
import { Check, ChevronsUpDown, Plus } from 'lucide-react'
import { TeacherSelectorProps } from '@/components/teacher-selector/teacher-selector.type'
import { cn } from '@/lib/utils'
import { useMemo } from 'react'
import { useData } from '@/providers/data-provider'
import Link from 'next/link'

export function TeacherSelector(props: TeacherSelectorProps) {
  const { value, disabled, className, onChange } = props

  const {
    data: { educators },
  } = useData()

  const TEACHERS = useMemo(
    () =>
      educators?.map((teacher) => ({
        label: `${teacher.name} ${teacher.lastName}`,
        value: teacher.id,
      })),
    [educators]
  )

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant='outline'
          role='combobox'
          className={cn(
            'w-full justify-between',
            !value && 'text-muted-foreground',
            className
          )}
        >
          {value
            ? TEACHERS.find((teacher) => teacher.value === value)?.label
            : 'Selecciona un profesor...'}
          <ChevronsUpDown className='opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-80 p-0'>
        <Command className='w-full'>
          <CommandList>
            <CommandEmpty>
              <article className='text-muted-foreground'>
                <p>No se encontraron educadores.</p>
              </article>
            </CommandEmpty>
            <CommandGroup>
              {TEACHERS?.map((teacher) => (
                <CommandItem
                  key={teacher.value}
                  value={teacher.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? '' : currentValue)
                  }}
                >
                  {teacher.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      value === teacher.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
            <div className='p-1'>
              <Button
                asChild
                variant='outline'
                size='full'
              >
                <Link
                  href={'/dashboard/create-user'}
                  className='flex items-center justify-between space-x-2'
                >
                  <span>Agregar educador</span>
                  <Plus />
                </Link>
              </Button>
            </div>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
