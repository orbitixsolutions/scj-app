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

  const searchParams = useSearchParams()

  const { id: WORKSHOP_ID } = useParams<{ id: string }>()
  const [isPending, startTransition] = useTransition()

  const queryParams = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  )
  const CURRENT_DATE =
    queryParams.get('date')?.toString() ?? formatISODateToString(new Date())

  const { data } = useData()
  const { initialAssistances: initial } = data

  const INITIAL = initial.find((item) => item.studentId === STUDENT_ID)
  const INITIAL_LIST_STATUS = INITIAL?.status

  const STATUS = filterCurrentStatus(assistances, CURRENT_DATE)
  const LAST_STATUS = STATUS || 'NOT_DETERMINED'

  const compareStatus = (status: StatusEnum) => {
    const ASSISTED =
      INITIAL_LIST_STATUS === 'ATTENDED' && status === 'NOT_ATTENDED'
    const ASSISTED_EXCUSED =
      INITIAL_LIST_STATUS === 'ATTENDED' && status === 'ATTENDED_EXCUSED'

    if (institute === 'EXTERIOR_STUDENT' && ASSISTED) return 'EXTERNAL_STUDENT'

    if (ASSISTED_EXCUSED) return 'SPECIAL_CASE_ATTENDED_EXCUSED'
    if (ASSISTED) return 'SPECIAL_CASE_NO_ATTENDED'

    const TRANSITIONS = STATUS_MAP[INITIAL_LIST_STATUS as never]
    return TRANSITIONS || 'EXTERNAL_STUDENT'
  }

  const currentStatus = compareStatus(LAST_STATUS)

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
    status: STATUS,
    lastStatus: LAST_STATUS,
    initialStatus: INITIAL_LIST_STATUS,
    currentStatus,
    CURRENT_DATE,
    onChange,
  }
}
