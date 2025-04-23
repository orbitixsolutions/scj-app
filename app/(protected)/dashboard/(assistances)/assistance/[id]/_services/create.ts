'use server'

import { currentRole } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'

type AbsentsProps = {
  studentId: string
  workshopId: string
  currentDate: string
}

export async function createAbsent(props: AbsentsProps) {
  const { studentId, workshopId, currentDate } = props
  const ROLE = await currentRole()

  if (ROLE === 'STUDENT') {
    return { status: 400, message: 'No tienes permisos.' }
  }

  const CURRENT_DATE = new Date(currentDate)

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
