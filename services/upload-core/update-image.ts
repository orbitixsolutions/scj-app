'use server'

import { db } from '@/lib/db'

type UpdateImageProps = {
  path: string
  itemId: string | undefined
  secure_url: string | null
}

export async function updateImage(props: UpdateImageProps) {
  const { path, itemId, secure_url } = props

  switch (path) {
    case 'workshop':
      await db.workshops.update({
        where: { id: itemId },
        data: {
          photo: secure_url,
        },
      })
      return { status: 201, message: 'Imagen subida correctamente.' }
    case 'student':
      await db.students.update({
        where: { id: itemId },
        data: {
          photo: secure_url,
        },
      })
      return { status: 201, message: 'Imagen subida correctamente.' }
    case 'workshop':
      await db.workshops.update({
        where: { id: itemId },
        data: {
          photo: secure_url,
        },
      })
      return { status: 201, message: 'Imagen subida correctamente.' }
    default:
      return { status: 403, message: 'No se pudo actualizar la imagen.' }
  }
}
