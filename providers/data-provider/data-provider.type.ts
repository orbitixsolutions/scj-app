import {
  Absents,
  InitialAssistances,
  Students,
  User,
  Workshops,
} from '@prisma/client'

type DataProps = {
  students: Students[]
  workshops: Workshops[]
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
