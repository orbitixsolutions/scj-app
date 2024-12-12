import { Prisma } from '@prisma/client'

export type WorkshopListProps = {
  data: Array<
    Prisma.WorkshopsGetPayload<{
      include: {
        day: true
        teacher: true
        students: true
      }
    }>
  >
}
