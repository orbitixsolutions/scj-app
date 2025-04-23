'use server'

import { currentRole } from '@/lib/auth'
import { db } from '@/lib/db'

type WorkshopStudent = {
  id: string
  studentId: string
  workshopId: string
}

export async function addStudentToWorkshop(props: WorkshopStudent) {
  const { studentId, workshopId, id } = props
  const ROLE = await currentRole()

  if (ROLE === 'STUDENT') {
    return { status: 401, message: 'No tienes permisos.' }
  }

  try {
    await db.studentsToWorkshop.create({
      data: {
        id,
        studentId,
        workshopId,
      },
    })

    return { status: 201, message: 'Alumno agregado correctamente.' }
  } catch (error) {
    console.error(error)
    return { status: 400, message: 'Ha ocurrido un error.' }
  }
}
