import { CredentialsSignin, Session, User } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import Credentials from 'next-auth/providers/credentials'

import { verifyPassword } from './password'

import { prisma } from '@/lib/prisma/db'

class InvalidSignInError extends CredentialsSignin {
  code = 'INVALID_CREDENTIALS'
}

class AccountInactiveError extends CredentialsSignin {
  code = 'INVALID_CREDENTIALS'
}

export const authConfig = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(
        credentials: Partial<Record<'email' | 'password', unknown>>,
      ): Promise<User> {
        const { email, password } = credentials || {}

        if (!credentials || !email || !password) {
          throw new InvalidSignInError()
        }

        const user = await prisma.user.findUnique({
          where: { email: (email as string).toLowerCase() },
          include: {
            status: true,
            profileImage: true,
          },
        })

        if (!user || !user.hashedPassword) {
          throw new InvalidSignInError()
        }

        try {
          const isPasswordValid = await verifyPassword(
            password as string,
            user.hashedPassword,
          )

          if (!isPasswordValid) {
            console.log('Invalid password')
            throw new InvalidSignInError()
          }

          return user
        } catch (error) {
          console.error('Password verification error:', error)
          throw new InvalidSignInError()
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }): Promise<JWT> {
      if (user) {
        // User is available during sign-in
        token.id = user.id
      }
      return token
    },
    async session({
      session,
      token,
    }: {
      session: Session
      token: JWT
    }): Promise<Session> {
      if (token.id && session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
}
