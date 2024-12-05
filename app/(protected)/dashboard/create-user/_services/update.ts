'use server'

import { z } from 'zod'
import { currentRole } from '@/lib/auth'
import { UserSchema } from '@/schemas'
import db from '@/lib/db'

export async function updateUser(
  values: z.infer<typeof UserSchema>,
  userId: string
) {
  const ROLE = await currentRole()

  if (ROLE === 'STUDENT') {
    return { status: 401, message: 'No tienes permiosos.' }
  }

  const VALIDATION = UserSchema.safeParse(values)

  if (!VALIDATION.success) {
    return { status: 400, message: 'Datos invalidos.' }
  }

  const {
    name,
    lastName,
    email,
    password,
    documentIdentity,
    role,
    description,
  } = VALIDATION.data

  try {
    await db.user.update({
      where: { id: userId },
      data: {
        name,
        lastName,
        email,
        password,
        documentIdentity,
        role,
        description,
      },
    })

    return { status: 201, message: 'Usuario actualizado.' }
  } catch {
    return { status: 500, message: 'Ha ocurrido un error.' }
  }
}
