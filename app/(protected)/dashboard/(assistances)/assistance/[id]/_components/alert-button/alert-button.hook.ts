/* eslint-disable @typescript-eslint/no-unused-vars */

import { Assistances, StatusEnum } from '@prisma/client'
import { AlertButtonProps } from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_components/alert-button/alert-button.type'
import { useParams, useSearchParams } from 'next/navigation'
import { createAbsent } from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_services/create'
import { useTransition } from 'react'
import { useData } from '@/providers/data-provider'
import { toast } from 'sonner'
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

export function useAlertButton(props: AlertButtonProps) {
  const { assistances, institute, id } = props
  const STUDENT_ID = id

  const { id: WORKSHOP_ID } = useParams<{ id: string }>()
  const [isPending, startTransition] = useTransition()

  const params = useSearchParams()

  const searchParams = new URLSearchParams(params)
  const CURRENT_DATE =
    searchParams.get('date')?.toString() ?? formatISODateToString(new Date())

  const { data } = useData()
  const { initialAssistances: initial, absents } = data

  const INITIAL_LIST = initial.find((item) => item.studentId === STUDENT_ID)
  const ABSENT = absents.find((item) => item.studentId === STUDENT_ID)
  const ABSENT_ID = ABSENT?.id

  const ABSENT_DATE = formatISODateToString(ABSENT?.date || new Date())
  const IS_TODAY = formatISODateToString(CURRENT_DATE) === ABSENT_DATE

  const status = filterCurrentStatus(assistances, CURRENT_DATE)
  const INITIAL_LIST_STATUS = INITIAL_LIST?.status
  const LAST_STATUS = status || 'NOT_DETERMINED'

  const onSubmit = () => {
    if (!!ABSENT_ID && IS_TODAY) {
      return toast.error('Este estudiante ya se notificó.')
    }

    startTransition(async () => {
      const DATA = {
        studentId: STUDENT_ID,
        workshopId: WORKSHOP_ID,
        currentDate: CURRENT_DATE,
      }

      const { status, message } = await createAbsent(DATA)

      if (status === 201) {
        toast.success(message)
        return
      }

      toast.success(message)
    })
  }

  const compareStatus = (status: StatusEnum) => {
    const ASSISTED =
      (INITIAL_LIST_STATUS === 'ATTENDED' && status === 'NOT_ATTENDED') ||
      (INITIAL_LIST_STATUS === 'ATTENDED' && status === 'ATTENDED_EXCUSED')

    if (institute !== 'LOS_PINOS' && ASSISTED) return 'EXTERNAL_STUDENT'
    if (ASSISTED) return 'SPECIAL_CASE_NO_ATTENDED'

    const TRANSITIONS = STATUS_MAP[INITIAL_LIST_STATUS as never]
    return TRANSITIONS || 'EXTERNAL_STUDENT'
  }

  const currentStatus = compareStatus(LAST_STATUS)
  const disabled = currentStatus !== 'SPECIAL_CASE_NO_ATTENDED'
  const isNotified =
    !!ABSENT_ID && IS_TODAY && currentStatus === 'SPECIAL_CASE_NO_ATTENDED'

  return {
    status,
    lastStatus: LAST_STATUS,
    currentStatus,
    initialStatus: INITIAL_LIST_STATUS,
    disabled,
    isPending,
    isNotified,
    CURRENT_DATE,
    onSubmit,
  }
}
