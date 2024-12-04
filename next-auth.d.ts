import NextAuth, { type DefaultSession } from 'next-auth'
import { JWT } from 'next-auth/jwt'

export type ExtendedUser = DefaultSession['user'] & {
  role: 'DIRECTIVE' | 'ADMIN' | 'TEACHER' | 'STUDENT' | string
}

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: 'DIRECTIVE' | 'ADMIN' | 'TEACHER' | 'STUDENT' | string
  }
}
