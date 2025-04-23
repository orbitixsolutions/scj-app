'use client'

import { TeacherSelector } from '@/components/teacher-selector'
import { TeacherQuerySelectorProps } from '@/components/teacher-query-selector/teacher-query-selector.type'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

const DEBOUNCE_TIME = 500

export function TeacherQuerySelector(props: TeacherQuerySelectorProps) {
  const { queryParam, className } = props

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
    <div className='flex items-center space-x-2'>
      <p className='text-sm'>Talleres de:</p>

      <TeacherSelector
        className={className}
        onChange={(value) => handleSearch(value)}
        value={searchParams.get(queryParam)?.toString()}
      />
    </div>
  )
}
