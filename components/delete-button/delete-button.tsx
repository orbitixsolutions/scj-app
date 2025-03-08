'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  DeleteButtonProps,
  UseDeleteProps,
} from '@/components/delete-button/delete-button.type'
import { deleteImage } from '@/services/upload-core/delete-image'
import { Button } from '@/components/ui/button'
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { useCurrentRole } from '@/hooks/use-session'

function useDelete(props: UseDeleteProps) {
  const { itemId, imageSettings, onDelete } = props

  const [isPending, startTransition] = useTransition()
  const { refresh } = useRouter()

  function onDeleteItem() {
    startTransition(async () => {
      const { message, status } = await onDelete(itemId)

      if (status === 201) {
        if (imageSettings?.removeImage) {
          await deleteImage({
            itemId,
            folder: imageSettings.folder,
            path: imageSettings.path,
          })

          refresh()
        }

        toast.success(message)
        refresh()

        return
      }

      toast.error(message)
    })
  }

  return { onDeleteItem, isPending }
}

export function DeleteButton(props: DeleteButtonProps) {
  const { children, className, itemId, disabled, imageSettings, onDelete } =
    props
  const ROLE = useCurrentRole()

  const { isPending, onDeleteItem } = useDelete({
    itemId,
    imageSettings,
    onDelete,
  })

  if (ROLE === 'STUDENT' || ROLE === 'EDUCATOR') return null

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          disabled={isPending || disabled}
          size='icon'
          className={cn(className, 'p-1 z-40')}
        >
          {children}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Si estas seguro, presiona el botón
            de eliminar.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending || disabled}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onDeleteItem}
            disabled={isPending || disabled}
          >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
