'use server'

import { z } from 'zod'
import { currentRole } from '@/lib/auth'
import { WorkshopSchema } from '@/schemas'
import { DayEnum } from '@prisma/client'
import { db } from '@/lib/db'

export async function updateWorkshop(
  values: z.infer<typeof WorkshopSchema>,
  workshopId: string
) {
  const ROLE = await currentRole()

  if (ROLE === 'STUDENT' || ROLE === 'EDUCATOR') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const VALIDATION = WorkshopSchema.safeParse(values)

  if (!VALIDATION.success) {
    return { status: 401, message: 'Campos inválidos.' }
  }

  const { name, days, description, teacherId } = VALIDATION.data

  try {
    await db.workshops.update({
      where: { id: workshopId },
      data: {
        name,
        description,
        teacherId,
      },
    })

    await db.workshopsByDay.deleteMany({
      where: { workshopId: workshopId },
    })

    for (const day of days) {
      await db.workshopsByDay.create({
        data: {
          day: day as DayEnum,
          workshopId,
        },
      })
    }

    return { status: 201, message: 'Taller actualizado correctamente.' }
  } catch {
    return { status: 400, message: 'Ha ocurrido un error.' }
  }
}
