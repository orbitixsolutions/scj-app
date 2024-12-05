import { create } from 'zustand'

type FileImageProps = {
  imageFile: File | null
  imageBlob: string | null
  onChangeFile: (imageFile: File) => void
  onChangeBlob: (imageBlob: string) => void
  onClear: () => void
}

export const useFileImage = create<FileImageProps>((set) => ({
  imageFile: null,
  imageBlob: null,
  onChangeFile: (imageFile) => set(() => ({ imageFile })),
  onChangeBlob: (imageBlob) => set(() => ({ imageBlob })),
  onClear: () => set(() => ({ imageFile: null, imageBlob: null })),
}))
