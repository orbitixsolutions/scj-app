export type PageProps = {
  params: {
    id: string
  }
  searchParams: {
    date: string
    name: string
    lastName: string
  }
}

export type WorkshopActionType = {
  id: string
}

export interface StudentsProps {
  students: StudentsClass
}

export interface StudentsClass {
  assistances: Assistance[]
  lastName: string
  name: string
  documentIdentity: string
  institute: string
  id: string
  dateOfBirth: Date
  studyYear: string
  photo: null
}

export interface Assistance {
  id: string
  studentId: string
  workshopId: string
  countFaults: number
  status: Status
  date: Date
  createdAt: Date
  updatedAt: Date
}

export enum Status {
  ATTENDED = 'ATTENDED',
  ATTENDED_EXCUSED = 'ATTENDED_EXCUSED',
  NOT_ATTENDED = 'NOT_ATTENDED',
  NOT_DETERMINED = 'NOT_DETERMINED',
}
