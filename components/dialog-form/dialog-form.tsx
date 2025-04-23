import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { DialogFormProps } from '@/components/dialog-form/dialog-form.type'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'

export function DialogForm(props: DialogFormProps) {
  const {
    title,
    description,
    disabled,
    isEditing,
    isOpen,
    buttonClassName,
    children,
    formId,
    setIsOpen,
  } = props

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        {isEditing ? (
          <Button
            disabled={disabled}
            size='icon'
            variant='outline'
          >
            <Pencil />
          </Button>
        ) : (
          <Button
            disabled={disabled}
            variant='outline'
            className={buttonClassName}
          >
            Crear
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className='w-[720px] max-w-full'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {children}

        <DialogFooter className='grid grid-cols-2 gap-4'>
          <DialogClose asChild>
            <Button
              type='button'
              variant='outline'
            >
              Cancelar
            </Button>
          </DialogClose>

          <Button
            form={formId}
            disabled={disabled}
            type='submit'
          >
            {isEditing ? 'Guardar' : 'Crear'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
