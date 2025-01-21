import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET() {
//   const ROLE = await currentRole()

//   if (ROLE === 'STUDENT' || ROLE === 'TEACHER') {
//     return NextResponse.json(
//       { message: 'No tienes permisos.' },
//       { status: 401 }
//     )
//   }

  try {
    const STUDENT = await db.initialAssistances.findMany()

    return NextResponse.json(STUDENT, { status: 201 })
  } catch {
    return NextResponse.json(
      { message: 'Error al obtener usuarios.' },
      { status: 403 }
    )
  }
}
