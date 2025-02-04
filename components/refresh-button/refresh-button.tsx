'use client'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { RefreshCw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

export function RefreshButton() {
  const [isPending, startTransition] = useTransition()
  const { refresh } = useRouter()

  const handleRefresh = () => {
    startTransition(() => {
      refresh()
    })
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size='icon'
            onClick={handleRefresh}
            disabled={isPending}
          >
            <RefreshCw className={cn(isPending && 'animate-spin')} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Actualizar página</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
