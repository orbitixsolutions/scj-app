import { Assistances, StatusEnum } from '@prisma/client'
import { AssistanceFormProps } from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_components/assistance-form/assistance-form.type'
import { useParams, useSearchParams } from 'next/navigation'
import { useMemo, useTransition } from 'react'
import { createAssistance } from '@/app/(protected)/dashboard/(assistances)/assistences/_services/create'
import { toast } from 'sonner'
import { useData } from '@/providers/data-provider'
import { formatISODateToString } from '@/helpers/get-current-date'

const STATUS_MAP = {
  ATTENDED: 'ASSISTED',
  ATTENDED_EXCUSED: 'EXCUSED',
  NOT_ATTENDED: 'NOT_ASSISTED',
  NOT_DETERMINED: 'NOT_DETERMINED',
}

function filterCurrentStatus(assistances: Assistances[], currDate: string) {
  const STATUS = assistances.filter((item) => {
    const matcher = [
      currDate ? formatISODateToString(item.date) === currDate : true,
    ]

    return matcher.every(Boolean)
  })

  return STATUS.at(0)?.status
}

export function useAssistanceForm(props: AssistanceFormProps) {
  const { id, assistances, institute } = props
  const STUDENT_ID = id

  const { id: WORKSHOP_ID } = useParams<{ id: string }>()
  const [isPending, startTransition] = useTransition()

  const params = useSearchParams()

  const searchParams = useMemo(() => new URLSearchParams(params), [params])
  const CURRENT_DATE = searchParams.get('date')?.toString() ?? formatISODateToString(new Date())

  const { data } = useData()
  const { initialAssistances: initial } = data

  const INITIAL = initial.find((item) => item.studentId === STUDENT_ID)
  const initialStatus = INITIAL?.status

  const status = filterCurrentStatus(assistances, CURRENT_DATE)
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
        WORKSHOP_ID,
        CURRENT_DATE
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
    CURRENT_DATE,
    onChange,
  }
}
