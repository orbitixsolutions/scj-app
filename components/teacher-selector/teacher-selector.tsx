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
import { useSuspenseFetch } from '@/hooks/use-fetch'
import { Button } from '@/components/ui/button'
import { User } from '@prisma/client'
import { Check, ChevronsUpDown, Plus } from 'lucide-react'
import { TeacherSelectorProps } from '@/components/teacher-selector/teacher-selector.type'
import { cn } from '@/lib/utils'
import { useMemo } from 'react'
import Link from 'next/link'

export function TeacherSelector(props: TeacherSelectorProps) {
  const { value, disabled, className, onChange } = props

  const TEACHER_END_POINT = '/api/v0/dashboard/teachers'
  const { data } = useSuspenseFetch<User[]>(TEACHER_END_POINT)

  const TEACHERS = useMemo(
    () =>
      data.map((teacher) => ({
        label: `${teacher.name} ${teacher.lastName}`,
        value: teacher.id,
      })),
    [data]
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
                <p>No se encontraron profesores.</p>
                <p>
                  Asigne un{' '}
                  <span>
                    <Link
                      className='underline '
                      href={'/dashboard/create-user'}
                    >
                      profesor
                    </Link>
                  </span>{' '}
                  a este taller.
                </p>
              </article>
            </CommandEmpty>
            <CommandGroup>
              {TEACHERS.map((teacher) => (
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
                  <span>Agregar profesor</span>
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
