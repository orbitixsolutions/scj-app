import { Role } from "@prisma/client"

export type PageProps = {
  searchParams: {
    name: string
    role: Role
  }
}

export type UserActionProps = {
  name: string
  role: Role
}
