import { Prisma } from '@prisma/client'

export type StudentItemProps = {
  student: Prisma.StudentsGetPayload<{ include: { workshops: true } }>
}
