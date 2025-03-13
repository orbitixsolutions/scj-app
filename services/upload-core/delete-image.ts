'use server'

import { currentRole } from '@/lib/auth'
import { v2 as cloudinary } from 'cloudinary'
import { updateImage } from '@/services/upload-core/update-image'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

interface DeleteAvatarProps {
  itemId: string | undefined
  folder: string
  path: string
}

export const deleteImage = async (props: DeleteAvatarProps) => {
  const { itemId, folder, path } = props

  const ROLE = await currentRole()
  if (ROLE === 'STUDENT' || ROLE === 'EDUCATOR')
    return { message: 'No tienes permisos.', status: 403 }

  try {
     cloudinary.uploader.destroy(`scj-app/${folder}/${path}-${itemId}`, {
      invalidate: true,
    })

    await updateImage({ itemId, path, secure_url: null })

    return { message: 'Imagen eliminada.', status: 201 }
  } catch {
    return { message: 'Error al eliminar la imagen.', status: 403 }
  }
}
