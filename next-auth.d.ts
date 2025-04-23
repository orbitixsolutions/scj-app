/* eslint-disable @typescript-eslint/no-unused-vars */

import NextAuth, { type DefaultSession } from 'next-auth'
import { JWT } from 'next-auth/jwt'

export type ExtendedUser = DefaultSession['user'] & {
  role: 'DIRECTIVE' | 'ADMIN' | 'EDUCATOR' | 'STUDENT' | string
  lastName: string
}

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: 'DIRECTIVE' | 'ADMIN' | 'EDUCATOR' | 'STUDENT' | string
    lastName: string
  }
}
