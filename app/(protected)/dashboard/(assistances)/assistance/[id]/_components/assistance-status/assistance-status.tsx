import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { AssistanceStatusProps } from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_components/assistance-status/assistance-status.type'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export function AssistanceStatus(props: AssistanceStatusProps) {
  const { children, destructive = false } = props

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={destructive ? 'destructive' : 'secondary'}
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
