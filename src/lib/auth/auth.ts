import bcrypt from 'bcrypt'
import NextAuth, { CredentialsSignin } from 'next-auth'
import { Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'

import { prisma } from '@/lib/prisma/db'

class InvalidSignInError extends CredentialsSignin {
  code = 'INVALID_CREDENTIALS'
}

class AccountInactiveError extends CredentialsSignin {
  code = 'INVALID_CREDENTIALS'
}

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
          throw new InvalidSignInError()
        }

        const user = await prisma.user.findUnique({
          where: { email: (email as string).toLowerCase() },
        })

        if (!user || !user.hashedPassword) {
          throw new InvalidSignInError()
        }

        const isPasswordValid = await bcrypt.compare(password as string, user.hashedPassword)

        if (!isPasswordValid) {
          console.log('Invalid password')
          throw new InvalidSignInError()
        }

        return user
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id
      }
      return token
    },
    session({ session, token }: { session: Session; token: JWT }) {
      if (token.id && session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  pages: {
    signIn: '/',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
})
