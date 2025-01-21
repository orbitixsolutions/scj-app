import { InitialAssistances, StatusEnum } from '@prisma/client'
import { useFetch } from '@/hooks/use-fetch'
import { AlertButtonProps } from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_components/alert-button/alert-button.type'

const STATUS_MAP = {
  ATTENDED: 'ASSISTED',
  ATTENDED_EXCUSED: 'EXCUSED',
  NOT_ATTENDED: 'NOT_ASSISTED',
  NOT_DETERMINED: 'NOT_DETERMINED',
}

export function useAlertButton(props: AlertButtonProps) {
  const { students: STUDENT } = props

  const API_URL = '/api/v0/dashboard/initial-list/student/id'
  const { data } = useFetch<InitialAssistances>(`${API_URL}/${STUDENT.id}`)
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

  return {
    status,
    lastStatus,
    currentStatus,
  }
}
