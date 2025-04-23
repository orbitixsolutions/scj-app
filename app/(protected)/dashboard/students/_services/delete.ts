'use server'

import { db } from '@/lib/db'
import { currentRole } from '@/lib/auth'
import { deleteImage } from '@/services/upload-core/delete-image'

export async function deleteStudent(id: string) {
  const ROLE = await currentRole()

  if (ROLE === 'STUDENT') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  try {
    await db.students.delete({ where: { id } })
    return { status: 201, message: 'Alumno eliminado correctamente.' }
  } catch {
    return { status: 400, message: 'Ha ocurrido un error.' }
  }
}

export async function deleteStudents(items: string[]) {
  const ROLE = await currentRole()

  if (ROLE === 'STUDENT' || ROLE === 'EDUCATOR') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  if (items.length === 0) {
    return { status: 400, message: 'Debes seleccionar al menos un estudiante.' }
  }

  try {
    items.forEach(async (item) => {
      await deleteImage({ folder: 'students', path: 'student', itemId: item })
    })

    await db.students.deleteMany({ where: { id: { in: items } } })

    return { status: 201, message: 'Alumnos eliminados correctamente.' }
  } catch {
    return { status: 400, message: 'Ha ocurrido un error.' }
  }
}
