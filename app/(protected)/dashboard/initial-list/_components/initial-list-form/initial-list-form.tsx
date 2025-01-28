import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { InitialListFormProps } from '@/app/(protected)/dashboard/initial-list/_components/initial-list-form/initial-list-form.type'
import { ASSISTANCE_COLORS, SELECT_ASSISTANCE_STATUS } from '@/constants'
import { useTransition } from 'react'
import { updateInitialAssistance } from '@/app/(protected)/dashboard/initial-list/_services/update'
import { StatusEnum } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export function InitialListForm(props: InitialListFormProps) {
  const { initialList } = props

  const [isPending, startTransition] = useTransition()
  const { refresh } = useRouter()

  const VALUE = initialList?.status ?? 'NOT_DETERMINED'

  const onChange = (value: StatusEnum) => {
    const ID = initialList?.id

    startTransition(async () => {
      const { status, message } = await updateInitialAssistance(value, ID)

      if (status === 201) {
        toast.success(message)
        refresh()
        return
      }

      toast.error(message)
    })
  }

  return (
    <Select
      value={VALUE}
      onValueChange={onChange}
      disabled={isPending}
    >
      <SelectTrigger
        className={cn(
          'w-[180px]',
          ASSISTANCE_COLORS[VALUE]
        )}
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
  )
}
