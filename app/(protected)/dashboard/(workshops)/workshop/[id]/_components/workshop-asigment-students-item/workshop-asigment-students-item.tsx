'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useFetch } from '@/hooks/use-fetch'
import { WorkshopAsigmentStudentsProps } from '@/app/(protected)/dashboard/(workshops)/workshop/[id]/_components/workshop-asigment-students-item/workshop-asigment-students-item.type'
import { Students } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { CornerDownRight } from 'lucide-react'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { removeStudentFromWorkshop } from '@/app/(protected)/dashboard/(workshops)/workshop/[id]/_services/delete'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function WorkshopAsigmentStudentsItem(
  props: WorkshopAsigmentStudentsProps
) {
  const { student } = props
  const { studentId, id } = student

  const [isPending, startTransition] = useTransition()
  const { refresh } = useRouter()

  const { data: STUDENT } = useFetch<Students>(
    `/api/v0/dashboard/students/id/${studentId}`
  )

  const handleRemoveStudent = async (id: string) => {
    startTransition(async () => {
      const { status, message } = await removeStudentFromWorkshop(id)

      if (status === 201) {
        toast.success(message)
        refresh()

        return
      }

      toast.error(message)
    })
  }

  return (
    <Card className={cn(isPending && 'cursor-wait opacity-50')}>
      <div className='p-4 flex items-center justify-between'>
        <h3 className='line-clamp-1 text-sm'>
          {STUDENT.name} {STUDENT.lastName}
        </h3>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant='default'
              size='icon'
              disabled={isPending}
            >
              <CornerDownRight />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className='max-w-[320px]'>
            <AlertDialogHeader>
              <AlertDialogTitle className='text-center'>
                ¿Estás seguro de quitar a este estudiante de este taller?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter className='grid grid-cols-2 gap-2'>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                disabled={isPending}
                onClick={() => handleRemoveStudent(id)}
              >
                Quitar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Card>
  )
}
