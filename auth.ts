import { PrismaAdapter } from '@auth/prisma-adapter'
import { getUserById } from '@/lib/users'
import authConfig from '@/auth.config'
import NextAuth from 'next-auth'
import { db } from '@/lib/db'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role
        session.user.lastName = token.lastName
      }
      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token

      token.role = existingUser.role
      token.lastName = existingUser.lastName

      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig
})