import { AbsentItem } from '@/app/(protected)/dashboard/(absents)/absents/_components/absent-item'
import { AbsentListProps } from '@/app/(protected)/dashboard/(absents)/absents/_components/absent-list/absent-list.type'

export function AbsentList(props: AbsentListProps) {
  const { data: WORKSHOPS } = props

  const MAPPED_WORKSHOPS = WORKSHOPS?.map((workshop) => (
    <li
      key={workshop.id}
      className='relative hover:scale-105 duration-300 ease-in-out transition-all'
    >
      <AbsentItem {...workshop} />
    </li>
  ))

  if (!WORKSHOPS?.length) {
    return (
      <div className='flex h-full min-h-[calc(100svh_-_20rem)] w-full flex-col items-center justify-center'>
        <p className='text-center font-bold text-6xl opacity-60'>
          No hay talleres.
        </p>
      </div>
    )
  }

  return (
    <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
      {MAPPED_WORKSHOPS}
    </ul>
  )
}
