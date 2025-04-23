import { currentRole } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  const ROLE = await currentRole()

  if (ROLE === 'STUDENT' || ROLE === 'EDUCATOR') {
    return NextResponse.json(
      { message: 'No tienes permisos.' },
      { status: 401 }
    )
  }

  try {
    const TEACHERS = await db.user.findMany({
      where: {
        role: 'EDUCATOR',
      },
    })

    return NextResponse.json(TEACHERS, { status: 201 })
  } catch {
    return NextResponse.json(
      { message: 'Error al obtener usuarios.' },
      {
        status: 403,
      }
    )
  }
}
