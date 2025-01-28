'use client'

import {
  AlertDialogTrigger,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { MotionDiv } from '@/components/motion/motion-div'
import { Button } from '@/components/ui/button'
import { EllipsisVertical } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'
import { useStudentBatch } from '@/providers/student-batch-provider'
import { useCallback, useEffect } from 'react'

export function StudentBatchDelete() {
  const { isDeleting, isPending, numberOfItems, form, onDeleting } =
    useStudentBatch()

  const handleReset = useCallback(() => {
    form.reset()
    onDeleting(false)
  }, [form, onDeleting])

  useEffect(() => {
    if (isDeleting) {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          handleReset()
        }
      })

      return () => {
        document.removeEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
            handleReset()
          }
        })
      }
    }
  }, [isDeleting, handleReset])

  return (
    <AnimatePresence mode='wait'>
      {isDeleting && (
        <MotionDiv
          key='delete-students'
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.15 }}
          className={cn(
            'fixed bottom-20 right-8 duration-300 flex items-center justify-center gap-4 rounded-md p-4 bg-secondary text-sm transition-opacity'
          )}
        >
          <p className='text-primary'>
            Se eliminaran {numberOfItems} estudiantes
          </p>

          <div className='flex items-center space-x-2'>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button disabled={isPending || numberOfItems === 0}>
                  Eliminar
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                </AlertDialogHeader>

                <p>
                  ¿Deseas eliminar estos estudiantes? Una vez eliminados no se
                  podrán recuperar.
                </p>

                <AlertDialogFooter>
                  <AlertDialogCancel asChild>
                    <Button variant='secondary'>Cancelar</Button>
                  </AlertDialogCancel>

                  <AlertDialogAction asChild>
                    <Button
                      type='submit'
                      variant='default'
                      form='delete-students'
                      disabled={isPending}
                    >
                      Eliminar
                    </Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size='icon'
                  variant='ghost'
                >
                  <EllipsisVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={handleReset}>
                  Cancelar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </MotionDiv>
      )}
    </AnimatePresence>
  )
}
