import type { NextAuthConfig } from 'next-auth'
import { LoginSchema } from '@/schemas'
import { getUserByEmail } from '@/lib/users'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

export default {
  providers: [
    Credentials({
      async authorize(credentials): Promise<{ id: string } | null> {
        const validateFields = LoginSchema.safeParse(credentials)

        if (validateFields.success) {
          const { email, password } = validateFields.data

          const user = await getUserByEmail(email)
          if (!user || !user.password) return null

          const PASS_MATCH = await bcrypt.compare(password, user.password)
          if (!PASS_MATCH) return null

          return user
        }

        return null
      },
    }),
  ],
} satisfies NextAuthConfig
