'use server'

import { currentRole } from '@/lib/auth'
import { db } from '@/lib/db'

export async function deleteUser(id: string) {
  const ROLE = await currentRole()

  if (ROLE === 'STUDENT' || ROLE === 'EDUCATOR') {
    return { status: 401, message: 'No tienes permisos.' }
  }

  try {
    await db.user.delete({
      where: { id },
    })

    return { status: 201, message: 'Usuario eliminado correctamente.' }
  } catch {
    return { status: 403, message: 'No se pudo eliminar el usuario.' }
  }
}
