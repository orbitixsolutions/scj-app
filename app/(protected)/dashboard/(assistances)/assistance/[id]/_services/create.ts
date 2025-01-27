'use server'

import { revalidatePath } from 'next/cache'
import db from '@/lib/db'

type AbsentsProps = {
  studentId: string
  workshopId: string
}

export async function createAbsent(props: AbsentsProps) {
  const { studentId, workshopId } = props

  try {
    await db.absents.create({
      data: { studentId, workshopId },
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
