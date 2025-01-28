import { StatusEnum } from '@prisma/client'
import { AssistanceFormProps } from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_components/assistance-form/assistance-form.type'
import { useParams } from 'next/navigation'
import { useTransition } from 'react'
import { createAssistance } from '@/app/(protected)/dashboard/(assistances)/assistences/_services/create'
import { toast } from 'sonner'
import { useData } from '@/providers/data-provider'

const STATUS_MAP = {
  ATTENDED: 'ASSISTED',
  ATTENDED_EXCUSED: 'EXCUSED',
  NOT_ATTENDED: 'NOT_ASSISTED',
  NOT_DETERMINED: 'NOT_DETERMINED',
}

export function useAssistanceForm(props: AssistanceFormProps) {
  const { id, assistances, institute } = props
  const STUDENT_ID = id

  const { id: WORKSHOP_ID } = useParams<{ id: string }>()
  const [isPending, startTransition] = useTransition()
  const { data } = useData()

  const { initialAssistances } = data
  const INITIAL_ASSISTANCE = initialAssistances.find(
    (initial) => initial.studentId === STUDENT_ID
  )
  
  const initialStatus = INITIAL_ASSISTANCE?.status
  const status = assistances?.at(-1)?.status
  const lastStatus = status || 'NOT_DETERMINED'


  const compareStatus = (status: StatusEnum) => {
    const ASSISTED = initialStatus === 'ATTENDED' && status === 'NOT_ATTENDED'

    if (ASSISTED) return 'SPECIAL_CASE_NO_ATTENDED'
    if (institute !== 'LOS_PINOS') return 'EXTERNAL_STUDENT'

    const TRANSITIONS = STATUS_MAP[initialStatus as never]
    return TRANSITIONS || 'EXTERNAL_STUDENT'
  }
  const currentStatus = compareStatus(lastStatus)

  const onChange = (value: StatusEnum) => {
    startTransition(async () => {
      const { status, message } = await createAssistance(
        value,
        STUDENT_ID,
        WORKSHOP_ID
      )

      if (status === 201) {
        toast.success(message)
        return
      }

      toast.error(message)
    })
  }

  return {
    isPending,
    status,
    lastStatus,
    initialStatus,
    currentStatus,
    onChange,
  }
}
