'use server'

import { z } from 'zod'
import { currentRole } from '@/lib/auth'
import { StudentSchema } from '@/schemas'
import { db } from '@/lib/db'

export async function createStudent(
  data: z.infer<typeof StudentSchema>,
  studentId: string
) {
  const ROLE = await currentRole()

  if (ROLE === 'STUDENT') {
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
  } = VALIDATION.data

  try {
    await db.students.create({
      data: {
        id: studentId,
        name,
        lastName,
        institute,
        educationalLevel,
        instituteName,
        dateOfBirth: new Date(dateOfBirth),
      },
    })

    await db.initialAssistances.create({
      data: {
        studentId: studentId,
        status: 'ATTENDED',
      },
    })

    return { status: 201, message: 'Alumno creado correctamente.' }
  } catch {
    return { status: 400, message: 'Ha ocurrido un error.' }
  }
}
