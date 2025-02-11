import { Prisma } from '@prisma/client'

export type AbsentItemProps = Prisma.WorkshopsGetPayload<{
  include: {
    teacher: true
    students: true
  }
}>
