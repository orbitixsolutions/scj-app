import { useRouter } from 'next/navigation'
import { useStore } from 'zustand'
import { useFileImage } from '@/stores/use-file-image'
import { cloudinaryUpload } from '@/services/upload-core/upload-cloudinary'
import { useCurrentRole } from '@/hooks/use-session'
import { toast } from 'sonner'

type HandleUploadImageProps = {
  id: string | undefined
  folder: string
  path: string
}

export function useUploadImageToCloud() {
  const { refresh } = useRouter()
  const ROLE = useCurrentRole()

  const FILE_STORE = useStore(useFileImage, (state) => state)

  const handleUpload = async ({ id, folder, path }: HandleUploadImageProps) => {
    const IMAGE_FILE = FILE_STORE?.imageFile

    if (!IMAGE_FILE) return

    if (ROLE === 'STUDENT' || ROLE === 'EDUCATOR') {
      return toast.error('No tienes permisos.')
    }

    const formData = new FormData()
    formData.append(`${path}-files`, IMAGE_FILE as File)

    const { status } = await cloudinaryUpload({
      folder,
      form: formData,
      itemId: id,
      path,
    })

    if (status === 201) {
      refresh()
      FILE_STORE.onClear()
      return
    }

    FILE_STORE.onClear()
  }

  return { handleUpload }
}
