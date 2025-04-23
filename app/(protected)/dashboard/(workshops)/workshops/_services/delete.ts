'use server'

import { currentRole } from '@/lib/auth'
import { db } from '@/lib/db'

export async function deleteWorkshop(workshopId: string) {
  const ROLE = await currentRole()

  if (ROLE === 'STUDENT' || ROLE === 'EDUCATOR') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  try {
    await db.workshops.delete({
      where: { id: workshopId },
    })

    return { status: 201, message: 'Taller eliminado correctamente.' }
  } catch {
    return { status: 400, message: 'Ha ocurrido un error.' }
  }
}
