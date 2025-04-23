'use server'

import * as z from 'zod'
import { UserSchema } from '@/schemas'
import { currentRole } from '@/lib/auth'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function createUser(values: z.infer<typeof UserSchema>) {
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

  const HASH_PASS = await bcrypt.hash(password, 10)

  try {
    await db.user.create({
      data: {
        name,
        lastName,
        email,
        password: HASH_PASS,
        documentIdentity,
        role,
        description,
      },
    })

    return { status: 201, message: 'Usuario creado.' }
  } catch {
    return { status: 500, message: 'Ha ocurrido un error.' }
  }
}
