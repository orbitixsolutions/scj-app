'use client'

import { Input } from '@/components/ui/input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { SearchBarProps } from '@/components/search-bar/search-bar.type'
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'
import { useDebouncedCallback } from 'use-debounce'
import { useId } from 'react'

const DEBOUNCE_TIME = 500

export function SearchBar(props: SearchBarProps) {
  const { queryParam, placeholder, className } = props

  const inputId = useId()

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
    <div className='relative'>
      <Input
        id={inputId}
        className={cn('peer pe-9 ps-9 w-[320px] max-w-full', className)}
        placeholder={placeholder}
        defaultValue={searchParams.get(queryParam)?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50'>
        <Search
          size={16}
          strokeWidth={2}
        />
      </div>
    </div>
  )
}
