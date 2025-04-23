import {
  getAbsents,
  getEducators,
  getInitialAssistances,
  getStudents,
  getWorkshops,
} from '@/app/(protected)/_services/fetch'
import { DataProvider } from '@/providers/data-provider/data-provider'

export async function DataProviderWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const [STUDENTS, WORKSHOPS, INITIAL_ASSISTANCES, ABSENTS, EDUCATORS] =
    await Promise.all([
      getStudents(),
      getWorkshops(),
      getInitialAssistances(),
      getAbsents(),
      getEducators(),
    ])

  if (!STUDENTS || !WORKSHOPS || !INITIAL_ASSISTANCES || !ABSENTS || !EDUCATORS)
    return

  const DATA = {
    students: STUDENTS,
    workshops: WORKSHOPS,
    initialAssistances: INITIAL_ASSISTANCES,
    absents: ABSENTS,
    educators: EDUCATORS,
  }

  return <DataProvider data={DATA}>{children}</DataProvider>
}
