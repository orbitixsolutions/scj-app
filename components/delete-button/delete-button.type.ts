export type DeleteButtonProps = {
  children: React.ReactNode
  className?: string
  itemId: string
  variant?: "primary" | "secondary" | "destructive" | "outline" | "ghost" | "link" | "default" | null | undefined
  imageSettings?: {
    removeImage: boolean
    path: string
    folder: string
  }
  onDelete: (
    itemId: string
  ) => Promise<{ message: string; status: boolean | number }>
  disabled?: boolean
}

export type UseDeleteProps = {
  itemId: string
  imageSettings?: {
    removeImage: boolean
    path: string
    folder: string
  }
  onDelete: (
    itemId: string
  ) => Promise<{ message: string; status: boolean | number }>
}
