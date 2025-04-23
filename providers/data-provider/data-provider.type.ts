import {
  Absents,
  InitialAssistances,
  Prisma,
  Students,
  User,
} from '@prisma/client'

type DataProps = {
  students: Students[]
  workshops: Prisma.WorkshopsGetPayload<{ include: { workshopsByDay: true } }>[]
  initialAssistances: InitialAssistances[]
  absents: Absents[]
  educators: User[]
}

export type DataContextProps = {
  data: DataProps
}

export type DataProviderProps = {
  children: React.ReactNode
  data: DataProps
}

export type DataProviderWrapperProps = {
  children: React.ReactNode
  data: DataProps
}
