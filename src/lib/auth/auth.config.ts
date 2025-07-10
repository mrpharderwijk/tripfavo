import { CredentialsSignin, Session, User } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import Credentials from 'next-auth/providers/credentials'

import { verifyPassword } from './password'

import {
  mapSafeUserDbToSafeUser,
  SafeUserDb,
} from '@/features/auth/prisma/safe-user'
import { prisma } from '@/lib/prisma/db'
import { SafeUser } from '@/types'

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
      ): Promise<User | null> {
        const { email, password } = credentials || {}

        if (!credentials || !email || !password) {
          throw new InvalidSignInError()
        }

        const user = await prisma.user.findUnique({
          where: { email: (email as string).toLowerCase() },
          select: {
            id: true,
            email: true,
            status: {
              select: {
                blocked: true,
                blockedAt: true,
              },
            },
            profileImage: {
              select: {
                url: true,
              },
            },
            role: true,
            hashedPassword: true,
            name: {
              select: {
                firstName: true,
                middleName: true,
                lastName: true,
              },
            },
            createdAt: true,
            updatedAt: true,
            emailVerified: true,
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
            throw new InvalidSignInError()
          }
          console.log('user ------> ', user)
          const authorizedUser = mapSafeUserDbToSafeUser(user)
          return authorizedUser as User
        } catch (error) {
          throw new InvalidSignInError()
        }
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWT
      user: any
    }): Promise<JWT & { user?: SafeUserDb }> {
      if (user) {
        // User is available during sign-in
        token.id = user.id
        token.user = user as SafeUserDb
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
        session.user = token.user as SafeUser
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
}
