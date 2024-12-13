import { Prisma } from '@prisma/client'

export type StudentListProps = {
  data: Array<
      Prisma.StudentsGetPayload<{ include: { workshops: true } }>
    >
}
