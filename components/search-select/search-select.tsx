'use client'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { SearchSelectProps } from '@/components/search-select/search-select.type'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

const DEBOUNCE_TIME = 500

export function SearchSelect(props: SearchSelectProps) {
  const { queryParam, placeholder, className, items } = props
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  const { replace } = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const searchParams = new URLSearchParams(params)

  const handleSearch = useDebouncedCallback((value: string) => {
    if (value) {
      searchParams.set(queryParam, value)
    } else {
      searchParams.delete(queryParam)
    }
    replace(`${pathname}?${searchParams.toString()}`, { scroll: false })
  }, DEBOUNCE_TIME)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={cn('justify-between', className)}
        >
          {value
            ? items.find((framework) => framework.value === value)?.label
            : placeholder}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>No hay resultados encontrados</CommandEmpty>
            <CommandGroup>
              {items.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue)
                    handleSearch(currentValue === value ? '' : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === framework.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
