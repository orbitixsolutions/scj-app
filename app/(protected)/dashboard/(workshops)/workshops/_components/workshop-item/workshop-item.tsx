import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { WorkshopItemProps } from '@/app/(protected)/dashboard/(workshops)/workshops/_components/workshop-item/workshop-item.type'
import { Users } from 'lucide-react'
import { WorkshopActions } from '@/app/(protected)/dashboard/(workshops)/workshops/_components/workshop-actions'
import NumberTicker from '@/components/ui/number-ticker'
import Link from 'next/link'

export function WorkshopItem(props: WorkshopItemProps) {
  const { teacher, students, name, id } = props
  const NUMBER_OF_STUDENTS = students.length

  return (
    <>
      <Link
        href={`/dashboard/workshop/${id}`}
        className='overflow-hidden'
      >
        <Card className='min-h-40 h-full select-none '>
          <CardHeader className='px-4 pt-4 space-y-2 text-center'>
            <CardTitle className='text-sm text-muted-foreground'>
              {teacher.name} {teacher.lastName}
            </CardTitle>
            <CardTitle className='text-2xl font-bold'>{name}</CardTitle>
          </CardHeader>

          <CardFooter className='px-4 pb-4 flex items-center justify-between'>
            <Card className='flex items-center space-x-4 py-2 px-4 bg-secondary'>
              <Users />

              {NUMBER_OF_STUDENTS !== 0 ? (
                <NumberTicker value={NUMBER_OF_STUDENTS} />
              ) : (
                <span>0</span>
              )}
            </Card>
          </CardFooter>
        </Card>
      </Link>

      <WorkshopActions id={id} />
    </>
  )
}
