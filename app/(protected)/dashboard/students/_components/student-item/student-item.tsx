import { Card } from '@/components/ui/card'
import { StudentItemProps } from '@/app/(protected)/dashboard/students/_components/student-item/student-item.type'
import { studentPlaceholder } from '@/assets/images'
import { SquareBox } from '@/components/square-box'
import { StudentActions } from '@/app/(protected)/dashboard/students/_components/student-actions'
import { StudentBatchCheckbox } from '@/app/(protected)/dashboard/students/_components/student-batch-checkbox'
import { WorkshopList } from '../workshop-list'
import Image from 'next/image'

export function StudentItem(props: StudentItemProps) {
  const {
    student: { name, lastName, photo, id, workshops },
  } = props

  const IS_PHOTO = !!photo ? photo : studentPlaceholder.src

  return (
    <Card className='w-full min-h-64 h-full flex flex-col justify-between items-center gap-4 relative overflow-hidden select-none'>
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

      <WorkshopList workshops={workshops} />

      <StudentActions id={id} />
      <StudentBatchCheckbox id={id} />
    </Card>
  )
}
