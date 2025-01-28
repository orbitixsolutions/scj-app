import { User } from 'next-auth'

export type AuthContextProps = {
  user:
    | (User & {
        role: 'DIRECTIVE' | 'ADMIN' | 'TEACHER' | 'STUDENT' | string
        lastName: string
      })
    | undefined
}

export type AuthProviderProps = {
  user:
    | (User & {
        role: 'DIRECTIVE' | 'ADMIN' | 'TEACHER' | 'STUDENT' | string
        lastName: string
      })
    | undefined
  children: React.ReactNode
}
