import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { AssistanceStatusProps } from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_components/assistance-status/assistance-status.type'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export function AssistanceStatus(props: AssistanceStatusProps) {
  const { children, variant = 'default' } = props

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className={cn(
              variant === 'destructive' &&
                'bg-destructive hover:bg-destructive/90 text-destructive-foreground',
              variant === 'warning' &&
                'bg-yellow-500 hover:bg-yellow-500/90 text-black'
            )}
            size='icon'
          >
            <AlertCircle />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{children}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
