'use server'

import { z } from 'zod'
import { currentRole } from '@/lib/auth'
import { WorkshopSchema } from '@/schemas'
import db from '@/lib/db'

export async function createWorkshop(
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
      await db.workshopDays.create({
        data: {
          day: item,
          workshopId: workshopId,
        },
      })
    })

    await db.workshops.create({
      data: {
        id: workshopId,
        name,
        description,
        teacherId,
      },
    })

    return { status: 201, message: 'Taller creado correctamente.' }
  } catch {
    return { status: 400, message: 'Ha ocurrido un error.' }
  }
}
