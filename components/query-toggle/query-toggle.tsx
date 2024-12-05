'use client'

import { Toggle } from '@/components/ui/toggle'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { QueryToggleProps } from '@/components/query-toggle/query-toggle.type'
import { cn } from '@/lib/utils'

export function QueryToggle(props: QueryToggleProps) {
  const {
    queryKey,
    children,
    className,
    queryValue,
    variant = 'outline',
  } = props

  const { replace } = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const searchParams = new URLSearchParams(params)

  const isPressed = searchParams.get(queryKey) === queryValue.toLowerCase()

  const handleToggle = (value: boolean) => {
    if (value) {
      searchParams.set(queryKey, queryValue.toLowerCase())
    } else {
      searchParams.delete(queryKey)
    }

    replace(`${pathname}?${searchParams.toString()}`, { scroll: false })
  }

  return (
    <Toggle
      className={cn('h-9', className)}
      variant={variant}
      pressed={isPressed}
      defaultPressed={isPressed}
      onPressedChange={handleToggle}
    >
      {children}
    </Toggle>
  )
}
