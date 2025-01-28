import { Prisma } from '@prisma/client'

export type WorkshopItemProps = Prisma.WorkshopsGetPayload<{
  include: {
    teacher: true
    students: true
  }
}>
