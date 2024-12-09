import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { useCallback, useEffect, useState } from 'react'
import { useFileImage } from '@/stores/use-file-image'
import { useStore } from '@/stores/use-store'
import { Check, Upload, X } from 'lucide-react'
import { ModalDropProps } from './modal-drop.type'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export function DialogDrop(props: ModalDropProps) {
  const { isLoading, disabled } = props

  const FILE_STORE = useStore(useFileImage, (state) => state)
  const [open, setIsOpen] = useState(false)

  useEffect(() => {
    if (!FILE_STORE?.imageBlob) {
      return URL.revokeObjectURL(FILE_STORE?.imageBlob ?? '')
    }
  }, [FILE_STORE])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const [FILE] = acceptedFiles
      FILE_STORE?.onChangeFile(FILE)
      FILE_STORE?.onChangeBlob(URL.createObjectURL(FILE))
    },
    [FILE_STORE]
  )

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept: { 'image/*': ['.jpg', '.jpeg', '.png'] },
      maxFiles: 1,
      maxSize: 1024 * 1024 * 5,
    })

  const LOADED_FILE = FILE_STORE?.imageFile
  const ERROR_FILE_CODE = fileRejections[0]?.errors[0]?.code

  const FILE_SIZE = LOADED_FILE ? LOADED_FILE.size / 1024 : 0

  return (
    <Dialog
      open={open}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <Button
          size='full'
          variant='outline'
          disabled={isLoading || disabled}
          className={cn(
            'gap-2 px-3',
            LOADED_FILE ? 'border-green-500 justify-between' : 'justify-start'
          )}
        >
          {LOADED_FILE ? 'Imagen seleccionada' : 'Subir imagen'}
          {LOADED_FILE && <Check className='w-4 h-4' />}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {LOADED_FILE ? 'Imagen seleccionada' : 'Subir imagen'}
          </DialogTitle>
        </DialogHeader>

        <div
          {...getRootProps()}
          className='space-y-2'
        >
          <input {...getInputProps()} />

          <div
            className={cn(
              'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
              isDragActive
                ? 'border-primary bg-primary/10'
                : 'border-muted-foreground/25 hover:border-primary/50'
            )}
          >
            <div className='space-y-2'>
              <Upload className='size-12 mx-auto text-muted-foreground' />
              <p className='text-sm font-medium'>
                Arrastra y suelta la imágen o selecciona una desde tu
                dispositivo
              </p>
              <p className='text-xs text-muted-foreground'>
                PNG, JPG, JPEG hasta 5MB
              </p>
            </div>
          </div>
        </div>

        {LOADED_FILE && FILE_STORE?.imageBlob && (
          <div className='flex items-center justify-between gap-4'>
            <div className='flex items-start gap-4'>
              <div className='size-20 rounded-md overflow-hidden'>
                <Image
                  src={FILE_STORE?.imageBlob}
                  alt='Imagen'
                  width={80}
                  height={80}
                  className='size-20 object-cover'
                />
              </div>
              <div className='w-[300px] flex flex-col gap-1 mt-2'>
                <span className='line-clamp-1 !break-all text-sm font-medium'>
                  {LOADED_FILE.name}
                </span>
                <span className='text-xs text-muted-foreground'>
                  {FILE_SIZE.toFixed(2)} KB
                </span>
              </div>
            </div>

            <div>
              <Button
                size='icon'
                variant='ghost'
                onClick={FILE_STORE.onClear}
              >
                <X />
              </Button>
            </div>
          </div>
        )}

        {ERROR_FILE_CODE === 'file-invalid-type' && (
          <p className='text-red-500 text-center'>
            El formato de la imágen no es válido.
          </p>
        )}

        {ERROR_FILE_CODE === 'file-too-large' && (
          <p className='text-red-500 text-center'>
            El tamaño de la imágen no puede superar los 5MB.
          </p>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button>Aceptar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
