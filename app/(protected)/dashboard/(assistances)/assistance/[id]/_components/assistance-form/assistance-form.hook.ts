import { InitialAssistances, StatusEnum } from '@prisma/client'
import { AssistanceFormProps } from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_components/assistance-form/assistance-form.type'
import { useFetch } from '@/hooks/use-fetch'
import { useParams } from 'next/navigation'
import { useTransition } from 'react'
import { createAssistance } from '@/app/(protected)/dashboard/(assistances)/assistences/_services/create'
import { toast } from 'sonner'

const STATUS_MAP = {
  ATTENDED: 'ASSISTED',
  ATTENDED_EXCUSED: 'EXCUSED',
  NOT_ATTENDED: 'NOT_ASSISTED',
  NOT_DETERMINED: 'NOT_DETERMINED',
}

export function useAssistanceForm(props: AssistanceFormProps) {
  const { students: STUDENT } = props
  const { id: WORKSHOP_ID } = useParams<{ id: string }>()

  const API_URL = '/api/v0/dashboard/initial-list/student/id'
  const { data } = useFetch<InitialAssistances>(`${API_URL}/${STUDENT.id}`)
  const [isPending, startTransition] = useTransition()

  const studentId = STUDENT.id
  const status = STUDENT?.assistances?.at(-1)?.status

  const initialStatus = data.status
  const lastStatus = status || 'NOT_DETERMINED'

  const compareStatus = (status: StatusEnum) => {
    const ASSISTED = initialStatus === 'ATTENDED' && status === 'NOT_ATTENDED'

    if (ASSISTED) return 'SPECIAL_CASE_NO_ATTENDED'
    if (STUDENT.institute !== 'LOS_PINOS') return 'EXTERNAL_STUDENT'

    const TRANSITIONS = STATUS_MAP[initialStatus]
    return TRANSITIONS || 'EXTERNAL_STUDENT'
  }
  const currentStatus = compareStatus(lastStatus)

  const onChange = (value: StatusEnum) => {
    startTransition(async () => {
      const { status, message } = await createAssistance(
        value,
        studentId,
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
    currentStatus,
    onChange,
  }
}
