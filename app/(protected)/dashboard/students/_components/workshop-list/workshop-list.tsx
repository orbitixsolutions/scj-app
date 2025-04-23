'use client'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { WorkshopListProps } from './workshop-list.type'
import { WorkshopItem } from '../workshop-item/workshop-item'

export function WorkshopList(props: WorkshopListProps) {
  const { workshops } = props
  const WORKSHOP_COUNT = workshops?.length

  const WORKSHOP_MAPPED = workshops?.map((workshop) => (
    <li key={workshop.id}>
      <WorkshopItem {...workshop} />
    </li>
  ))

  return (
    <div className='bg-secondary p-4 w-full  rounded text-sm'>
      <p className='text-center font-light'>
        {!!WORKSHOP_COUNT ? (
          <Popover>
            <PopoverTrigger asChild>
              <div className='text-primary cursor-pointer hover:underline'>
                <span>Talleres asignados</span> ({WORKSHOP_COUNT})
              </div>
            </PopoverTrigger>
            <PopoverContent className='w-80'>
              <div className='space-y-4'>
                <h2 className='text-xl font-bold'>Talleres asignados</h2>
                <ul className='grid gap-2'>{WORKSHOP_MAPPED}</ul>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          'Sin talleres asignados'
        )}
      </p>
    </div>
  )
}
