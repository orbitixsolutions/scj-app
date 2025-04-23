import { currentRole } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const ROLE = await currentRole()
  const STUDENT_ID = params.id

  if (ROLE === 'STUDENT' || ROLE === 'EDUCATOR') {
    return NextResponse.json(
      { message: 'No tienes permisos.' },
      { status: 401 }
    )
  }

  try {
    const STUDENT = await db.students.findUnique({
      where: {
        id: STUDENT_ID,
      },
    })

    return NextResponse.json(STUDENT, { status: 201 })
  } catch {
    return NextResponse.json(
      { message: 'Error al obtener usuarios.' },
      {
        status: 403,
      }
    )
  }
}
