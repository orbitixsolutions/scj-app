import { currentRole } from '@/lib/auth'
import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const ROLE = await currentRole()
  const WORKSHOP_ID = params.id

  if (ROLE === 'STUDENT' || ROLE === 'TEACHER') {
    return NextResponse.json(
      { message: 'No tienes permisos.' },
      { status: 401 }
    )
  }

  try {
    const WORKSHOP = await db.workshops.findUnique({
      where: {
        id: WORKSHOP_ID,
      },
      include: {
        day: {
          select: {
            day: true,
          },
        },
      },
    })

    return NextResponse.json(WORKSHOP, { status: 201 })
  } catch {
    return NextResponse.json(
      { message: 'Error al obtener usuarios.' },
      {
        status: 403,
      }
    )
  }
}
