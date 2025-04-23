'use server'

import { currentRole } from '@/lib/auth'
import { db } from '@/lib/db'

export async function deleteAbsent(id: string) {
  const ROLE = await currentRole()

  if (ROLE === 'EDUCATOR' || ROLE === 'ROLE') {
    return { status: 403, message: 'No tienes permisos!' }
  }

  try {
    await db.absents.delete({ where: { id } })
    return { status: 201, message: 'Ausencia eliminada.' }
  } catch {
    return { status: 500, message: 'Ha ocurrido un error.' }
  }
}
