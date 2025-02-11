import { Prisma } from '@prisma/client'

export type AbsentListProps = {
  data: Array<
    Prisma.WorkshopsGetPayload<{
      include: {
        teacher: true
        students: true
      }
    }>
  >
}
