import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { useAlertButton } from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_components/alert-button/alert-button.hook'
import { AlertButtonProps } from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_components/alert-button/alert-button.type'
import { Bell, Check } from 'lucide-react'

export function AlertButton(props: AlertButtonProps) {
  const {
    disabled,
    isPending,
    initialStatus,
    isNotified,
    onSubmit,
  } = useAlertButton(props)

  if (!initialStatus) return null

  return (
    <div className='flex items-center gap-2'>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={disabled || isPending || isNotified}
              onClick={onSubmit}
              size='icon'
              variant='outline'
            >
              <Bell />
            </Button>
          </TooltipTrigger>
          <TooltipContent side='bottom'>
            {!isNotified && <p>Avisar a la directora</p>}
            {isNotified && <p>Estudiante notificado</p>}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {isNotified && <Check className='text-success' />}
    </div>
  )
}
