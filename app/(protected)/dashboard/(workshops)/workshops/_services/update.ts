'use server'

import { z } from 'zod'
import { currentRole } from '@/lib/auth'
import { WorkshopSchema } from '@/schemas'
import db from '@/lib/db'

export async function updateWorkshop(
  values: z.infer<typeof WorkshopSchema>,
  workshopId: string
) {
  const ROLE = await currentRole()

  if (ROLE === 'STUDENT' || ROLE === 'TEACHER') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const VALIDATION = WorkshopSchema.safeParse(values)

  if (!VALIDATION.success) {
    return { status: 401, message: 'Campos inválidos.' }
  }

  const { name, day, description, teacherId } = VALIDATION.data

  try {
    day.forEach(async (item) => {
      await db.workshopDays.updateMany({
        where: { day: item, workshopId },
        data: {
          day: item,
        },
      })
    })

    await db.workshops.update({
      where: { id: workshopId },
      data: {
        name,
        description,
        teacherId,
      },
    })

    return { status: 201, message: 'Taller actualizado correctamente.' }
  } catch {
    return { status: 400, message: 'Ha ocurrido un error.' }
  }
}
