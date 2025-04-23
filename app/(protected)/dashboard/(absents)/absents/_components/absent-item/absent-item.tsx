import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { AbsentItemProps } from '@/app/(protected)/dashboard/(absents)/absents/_components/absent-item/absent-item.type'
import Link from 'next/link'

export function AbsentItem(props: AbsentItemProps) {
  const { teacher, name, id } = props

  return (
    <>
      <Link
        href={`/dashboard/absent/${id}`}
        className='overflow-hidden'
      >
        <Card className='min-h-40 h-full select-none '>
          <CardHeader className='px-4 pt-4 space-y-2 text-center'>
            <CardTitle className='text-sm text-muted-foreground'>
              {teacher.name} {teacher.lastName}
            </CardTitle>
            <CardTitle className='text-2xl font-bold'>{name}</CardTitle>
          </CardHeader>
        </Card>
      </Link>
    </>
  )
}
