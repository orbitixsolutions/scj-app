'use server'

import { currentRole } from '@/lib/auth'
import { StatusEnum } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'

export async function createAssistance(
  data: StatusEnum,
  studentId: string,
  workshopId: string,
  currentDate: string | undefined
) {
  const ROLE = await currentRole()

  if (ROLE === 'STUDENT') {
    return { status: 400, message: 'No tienes permisos.' }
  }

  const CURRENT_DATE = new Date(currentDate ?? '')

  try {
    switch (data) {
      case 'ATTENDED':
        await db.assistances.create({
          data: {
            workshopId,
            studentId,
            status: 'ATTENDED',
            date: CURRENT_DATE,
          },
        })
        revalidatePath(`/dashboard/assistance/${workshopId}`)
        return { status: 201, message: 'Asistencia creada.' }

      case 'ATTENDED_EXCUSED':
        await db.assistances.create({
          data: {
            workshopId,
            studentId,
            status: 'ATTENDED_EXCUSED',
            date: CURRENT_DATE,
          },
        })
        revalidatePath(`/dashboard/assistance/${workshopId}`)
        return { status: 201, message: 'Asistencia creada.' }

      case 'NOT_ATTENDED':
        await db.assistances.create({
          data: {
            workshopId,
            studentId,
            status: 'NOT_ATTENDED',
            date: CURRENT_DATE,
          },
        })
        revalidatePath(`/dashboard/assistance/${workshopId}`)
        return { status: 201, message: 'Asistencia creada.' }

      case 'NOT_DETERMINED':
        await db.assistances.create({
          data: {
            workshopId,
            studentId,
            status: 'NOT_DETERMINED',
            date: CURRENT_DATE,
          },
        })
        revalidatePath(`/dashboard/assistance/${workshopId}`)
        return { status: 201, message: 'Asistencia creada.' }
      default:
        return { status: 400, message: 'No se ha podido crear la asistencia.' }
    }
  } catch {
    return { status: 403, message: 'Ha ocurrido un error.' }
  }
}
