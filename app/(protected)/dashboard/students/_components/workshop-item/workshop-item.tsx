'use client'

import { useData } from '@/providers/data-provider'
import { WorkshopItemProps } from './workshop-item.type'
import Link from 'next/link'

export function WorkshopItem(props: WorkshopItemProps) {
  const { workshopId } = props

  const { data } = useData()
  const WORKSHOP = data.workshops.find((workshop) => workshop.id === workshopId)

  return (
    <div>
      <h2>
        -{' '}
        <Link
          href={`/dashboard/workshop/${workshopId}`}
          className='hover:underline text-sm font-medium'
          target='_blank'
        >
          {WORKSHOP?.name}
        </Link>
      </h2>
    </div>
  )
}
