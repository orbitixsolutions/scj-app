import { currentRole } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const ROLE = await currentRole()
  const USER_ID = params.id

  if (ROLE === 'STUDENT' || ROLE === 'EDUCATOR') {
    return NextResponse.json(
      { message: 'No tienes permisos.' },
      { status: 401 }
    )
  }

  try {
    const USERS = await db.user.findUnique({
      where: {
        id: USER_ID,
      },
    })

    return NextResponse.json(USERS, { status: 201 })
  } catch {
    return NextResponse.json(
      { message: 'Error al obtener usuarios.' },
      {
        status: 403,
      }
    )
  }
}
