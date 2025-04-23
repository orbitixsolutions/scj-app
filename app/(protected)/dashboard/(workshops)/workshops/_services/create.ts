'use server'

import { z } from 'zod'
import { currentRole } from '@/lib/auth'
import { WorkshopSchema } from '@/schemas'
import { db } from '@/lib/db'
import { DayEnum } from '@prisma/client'

export async function createWorkshop(
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
    await db.workshops.create({
      data: {
        id: workshopId,
        name,
        description,
        teacherId,
      },
    })

    for (const day of days) {
      await db.workshopsByDay.create({
        data: {
          day: day as DayEnum,
          workshopId,
        },
      })
    }

    return { status: 201, message: 'Taller creado correctamente.' }
  } catch (e) {
    console.log(e)
    return { status: 400, message: 'Ha ocurrido un error.' }
  }
}
