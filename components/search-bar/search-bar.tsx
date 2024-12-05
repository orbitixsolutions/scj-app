'use client'

import { Input } from '@/components/ui/input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { SearchBarProps } from '@/components/search-bar/search-bar.type'
import { cn } from '@/lib/utils'

export function SearchBar(props: SearchBarProps) {
  const { queryParam, placeholder, className } = props

  const { replace } = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const searchParams = new URLSearchParams(params)

  const handleSearch = (value: string) => {
    if (value) {
      searchParams.set(queryParam, value)
    } else {
      searchParams.delete(queryParam)
    }
    replace(`${pathname}?${searchParams.toString()}`, { scroll: false })
  }

  return (
    <Input
      className={cn('w-[320px] max-w-full', className)}
      defaultValue={searchParams.get(queryParam)?.toString()}
      onChange={(e) => handleSearch(e.target.value)}
      placeholder={placeholder}
    />
  )
}
