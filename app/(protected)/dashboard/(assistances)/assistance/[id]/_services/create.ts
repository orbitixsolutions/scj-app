'use server'

import { revalidatePath } from 'next/cache'
import db from '@/lib/db'

type AbsentsProps = {
  studentId: string
  workshopId: string
  currentDate: string
}

export async function createAbsent(props: AbsentsProps) {
  const { studentId, workshopId, currentDate } = props

  const CURRENT_DATE = new Date(currentDate ?? '')
  CURRENT_DATE.setHours(24)
  CURRENT_DATE.setMinutes(30)

  try {
    await db.absents.create({
      data: { studentId, workshopId, date: CURRENT_DATE },
    })

    revalidatePath(`/dashboard/assistance/${workshopId}`)

    return {
      status: 201,
      message: 'Se le ha notificado a la directora correctamente!',
    }
  } catch {
    return { status: 500, message: 'Ha ocurrido un error.' }
  }
}
