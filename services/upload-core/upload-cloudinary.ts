'use server'

import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'
import { currentRole } from '@/lib/auth'
import { updateImage } from '@/services/upload-core/update-image'

type CloudinaryUploadProps = {
  form: FormData
  itemId: string | undefined
  folder: string
  path: string
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function cloudinaryUpload(props: CloudinaryUploadProps) {
  const { form, itemId, folder, path } = props

  const ROLE = await currentRole()

  if (ROLE === 'USER' || ROLE === 'STUDENT') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const FILE = form.get(`${path}-files`) as File
  const ARRAY_BUFFER = await FILE.arrayBuffer()
  const BUFFER = Buffer.from(ARRAY_BUFFER)

  try {
    const { secure_url } = (await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: `/${'scj-app'}/${folder}`,
            public_id: `${path}-${itemId}`,
          },
          function (error, result) {
            if (error) {
              reject(error)
              return
            }
            resolve(result as UploadApiResponse)
          }
        )
        .end(BUFFER)
    })) as UploadApiResponse

    return await updateImage({
      itemId,
      path,
      secure_url,
    })
  } catch {
    return { status: 403, message: 'Error al subir la imagen.' }
  }
}
