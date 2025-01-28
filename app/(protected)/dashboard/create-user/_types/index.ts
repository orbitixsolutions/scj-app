import { RolesEnum } from "@prisma/client"

export type PageProps = {
  searchParams: {
    name: string
    role: RolesEnum
  }
}

export type UserActionProps = {
  name: string
  role: RolesEnum
}
