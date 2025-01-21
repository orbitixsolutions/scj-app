import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { useAlertButton } from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_components/alert-button/alert-button.hook'
import { AlertButtonProps } from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_components/alert-button/alert-button.type'
import { Bell } from 'lucide-react'
import { TooltipTrigger } from '@radix-ui/react-tooltip'

export function AlertButton(props: AlertButtonProps) {
  const { currentStatus } = useAlertButton(props)

  const DISABLED = currentStatus !== 'SPECIAL_CASE_NO_ATTENDED'

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            disabled={DISABLED}
            size='icon'
            variant='outline'
          >
            <Bell />
          </Button>
        </TooltipTrigger>
        <TooltipContent side='bottom'>
          <p>Avisar a la directora</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
