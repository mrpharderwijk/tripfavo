import { UserRole } from '@prisma/client'

import { auth } from '@/lib/auth/auth'
import { prisma } from '@/lib/prisma/db'
import { SafeUser } from '@/types'

export async function getSession() {
  return await auth()
}

export async function getCurrentUser(): Promise<SafeUser | null> {
  try {
    const session = await getSession()

    if (!session?.user?.email) {
      return null
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        image: true,
        hashedPassword: true,
        favoriteIds: true,
        name: {
          select: {
            firstName: true,
            lastName: true,
            middleName: true,
          },
        },
        email: true,
        emailVerified: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!currentUser) {
      return null
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() ?? null,
      role: currentUser.role ?? [UserRole.GUEST, UserRole.HOST],
    }
  } catch (error: any) {
    return null
  }
}
