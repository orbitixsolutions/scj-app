'use server'

import { currentRole } from '@/lib/auth'
import db from '@/lib/db'

export async function removeStudentFromWorkshop(id: string) {
  const ROLE = await currentRole()

  if (ROLE === 'STUDENT') {
    return { status: 401, message: 'No tienes permisos.' }
  }

  try {
    await db.studentsToWorkshop.delete({
      where: {
        id,
      },
    })

    return { status: 201, message: 'Estudiante removido correctamente.' }
  } catch {
    return { status: 400, message: 'Ha ocurrido un error.' }
  }
}
