'use server'

import { currentRole } from '@/lib/auth'
import { StatusEnum } from '@prisma/client'
import { db } from '@/lib/db'

export async function updateInitialAssistance(
  data: StatusEnum,
  initialAssistanceId: string
) {
  const ROLE = await currentRole()

  if (ROLE === 'STUDENT' || ROLE === 'EDUCATOR') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  try {
    await db.initialAssistances.update({
      where: { id: initialAssistanceId },
      data: { status: data },
    })

    return { status: 201, message: 'Asistencia actualizada correctamente.' }
  } catch {
    return { status: 400, message: 'Ha ocurrido un error.' }
  }
}
