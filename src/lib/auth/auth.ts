import bcrypt from 'bcrypt'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'

import { prisma } from '@/lib/prisma/db'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials || {}

        if (!credentials || !email || !password) {
          throw new Error('Invalid credentials')
        }

        const user = await prisma.user.findUnique({
          where: { email: email as string },
        })

        if (!user || !user.hashedPassword) {
          throw new Error('Invalid credentials')
        }

        const isPasswordValid = await bcrypt.compare(password as string, user.hashedPassword)

        if (!isPasswordValid) {
          throw new Error('Invalid credentials')
        }

        return user
      },
    }),
  ],
  pages: {
    signIn: '/',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
})
