import { Prisma } from '@prisma/client'

export type AssistancePageProps = {
  params: {
    id: string
  }
  searchParams: {
    date: string | null
    name: string | null
    lastName: string | null
  }
}

export type getStudentsProps = {
  mode: 'normal' | 'dates'
  data: AssistancePageProps
}

export type WorkshopActionType = {
  id: string
}

export type WorkshopsProps = Prisma.WorkshopsGetPayload<{
  include: {
    students: {
      orderBy: {
        student: { name: 'asc' }
      }
      include: {
        student: {
          select: {
            lastName: true
            name: true
            documentIdentity: true
            institute: true
            educationalLevel: true
            instituteName: true
            id: true
            dateOfBirth: true
            studyYear: true
            photo: true
            createdAt: true
            updatedAt: true
            assistances: true
          }
        }
      }
    }
  }
}>

export type StudentsProps = Prisma.StudentsGetPayload<{
  include: { assistances: true }
}>
