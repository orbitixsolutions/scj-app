import { Prisma } from '@prisma/client'

export type WorkshopListProps = {
  data: Array<
    Prisma.WorkshopsGetPayload<{
      include: {
        days: true
        teacher: true
        students: true
      }
    }>
  >
}
