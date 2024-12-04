import type { NextAuthConfig } from 'next-auth'
import { LoginSchema } from '@/schemas'
import { getUserByEmail } from '@/lib/users'
import Credentials from 'next-auth/providers/credentials'

export default {
  providers: [
    Credentials({
      async authorize(credentials): Promise<{ id: string } | null> {
        const validateFields = LoginSchema.safeParse(credentials)

        if (validateFields.success) {
          const { email } = validateFields.data

          const user = await getUserByEmail(email)
          if (!user) return null

          return user
        }

        return null
      },
    }),
  ],
} satisfies NextAuthConfig
