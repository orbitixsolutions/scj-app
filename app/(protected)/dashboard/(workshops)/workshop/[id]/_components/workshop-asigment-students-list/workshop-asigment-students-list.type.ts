import { Prisma } from '@prisma/client'

export type WorkshopAsigmentStudentsProps = {
  data: Prisma.WorkshopsGetPayload<{
    include: {
      students: true
      teacher: true
    }
  }>
}
