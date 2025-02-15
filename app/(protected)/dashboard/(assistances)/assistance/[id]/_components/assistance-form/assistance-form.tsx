import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { AssistanceFormProps } from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_components/assistance-form/assistance-form.type'
import { ASSISTANCE_COLORS, SELECT_ASSISTANCE_STATUS } from '@/constants'
import { AssistanceStatus } from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_components/assistance-status'
import { useAssistanceForm } from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_components/assistance-form/assistance-form.hook'

export function AssistanceForm(props: AssistanceFormProps) {
  const {
    currentStatus,
    status,
    lastStatus,
    initialStatus,
    isPending,
    onChange,
  } = useAssistanceForm(props)

  if (!initialStatus && !currentStatus) return null

  return (
    <div className='flex items-center space-x-2'>
      <Select
        key={status}
        value={status}
        onValueChange={onChange}
        disabled={isPending}
      >
        <SelectTrigger
          className={cn('w-[200px]', ASSISTANCE_COLORS[lastStatus as never])}
        >
          <SelectValue placeholder='Seleccione un estado' />
        </SelectTrigger>
        <SelectContent>
          {SELECT_ASSISTANCE_STATUS.map((assistance_status) => (
            <SelectItem
              value={assistance_status.value}
              key={assistance_status.value}
            >
              {assistance_status.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {currentStatus === 'EXTERNAL_STUDENT' && (
        <AssistanceStatus>
          Este estudiante es un alumno exterior y sus asistencias no se cuentan
        </AssistanceStatus>
      )}

      {currentStatus === 'SPECIAL_CASE_NO_ATTENDED' && (
        <AssistanceStatus destructive>
          Según la lista de asistencias este estudiante debió asistir al taller
          y no lo hizo
        </AssistanceStatus>
      )}
    </div>
  )
}
