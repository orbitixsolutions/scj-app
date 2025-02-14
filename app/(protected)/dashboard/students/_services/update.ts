'use server'

import { z } from 'zod'
import { currentRole } from '@/lib/auth'
import { StudentSchema } from '@/schemas'
import db from '@/lib/db'

export async function updateStudent(
  data: z.infer<typeof StudentSchema>,
  studentId: string
) {
  const ROLE = await currentRole()

  if (ROLE === 'STUDENT' || ROLE === 'TEACHER') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const VALIDATION = StudentSchema.safeParse(data)

  if (!VALIDATION.success) {
    return { status: 401, message: 'Campos inválidos.' }
  }

  const {
    dateOfBirth,
    institute,
    lastName,
    name,
    educationalLevel,
    instituteName,
    studyYear,
  } = VALIDATION.data

  try {
    await db.students.update({
      where: { id: studentId },
      data: {
        name,
        lastName,
        studyYear,
        institute,
        educationalLevel,
        instituteName,
        dateOfBirth: new Date(dateOfBirth),
      },
    })

    return { status: 201, message: 'Alumno actualizado correctamente.' }
  } catch {
    return { status: 400, message: 'Ha ocurrido un error.' }
  }
}
