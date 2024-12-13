'use client'

import { studentPlaceholder } from '@/assets/images'
import { WorkshopStudentItemProps } from '@/app/(protected)/dashboard/(workshops)/workshop/[id]/_components/workshop-students-item/workshop-students-item.type'
import { Card } from '@/components/ui/card'
import { SquareBox } from '@/components/square-box'
import { CornerDownLeft } from 'lucide-react'
import { addStudentToWorkshop } from '@/app/(protected)/dashboard/(workshops)/workshop/[id]/_services/create'
import { useParams, useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export function WorkshopStudentItem(props: WorkshopStudentItemProps) {
  const { student } = props
  const { name, lastName, photo, id } = student

  const [isPending, startTransition] = useTransition()
  const { id: WORKSHOP_ID } = useParams<{ id: string }>()
  const { refresh } = useRouter()

  const IS_PHOTO = !!photo ? photo : studentPlaceholder.src

  const handleAddStudent = async (studentId: string, workshopId: string) => {
    startTransition(async () => {
      const STUDENT_WORKSHOP_ID = crypto.randomUUID()

      const { status, message } = await addStudentToWorkshop({
        id: STUDENT_WORKSHOP_ID,
        studentId,
        workshopId,
      })

      if (status === 201) {
        toast.success(message)
        refresh()

        return
      }

      toast.error(message)
    })
  }

  return (
    <Card
      className={cn(
        'w-full min-h-64 h-full flex flex-col justify-between items-center gap-4 relative overflow-hidden select-none group/item',
        isPending && 'cursor-wait opacity-50'
      )}
    >
      <div className='space-y-4 px-6 pt-6'>
        <SquareBox
          size='xl'
          className='mx-auto'
        >
          <Image
            src={IS_PHOTO}
            alt={`Foto del alumno ${name} ${lastName}`}
            width={1600}
            height={900}
            className='object-cover size-full'
          />
        </SquareBox>
        <div className='text-center'>
          <h3 className='font-medium text-[15px] leading-tight'>
            {name} {lastName}
          </h3>
        </div>
      </div>
      <div className='bg-secondary p-4 w-full rounded text-sm'>
        <p className='text-center font-light'>Sin talleres asignados</p>
      </div>

      <Button
        size='icon'
        disabled={isPending}
        className='!bg-green-400/40 absolute z-40 inset-0 opacity-0 group-hover/item:opacity-100 duration-300 ease-in-out transtion-all size-full'
        onClick={() => handleAddStudent(id, WORKSHOP_ID)}
      >
        <CornerDownLeft className='text-green-600 !size-20' />
      </Button>
    </Card>
  )
}
