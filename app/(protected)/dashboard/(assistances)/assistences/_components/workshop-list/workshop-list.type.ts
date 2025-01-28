import { Prisma } from '@prisma/client'

export type WorkshopListProps = {
  data: Array<
    Prisma.WorkshopsGetPayload<{
      include: {
        teacher: true
        students: true
      }
    }>
  >
}
