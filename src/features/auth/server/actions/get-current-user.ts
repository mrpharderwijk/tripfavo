import { Session } from 'next-auth'

import {
  mapSafeUserDbToSafeUser,
  safeUserSelect,
} from '@/features/auth/prisma/safe-user'
import { auth } from '@/lib/auth/auth'
import { prisma } from '@/lib/prisma/db'
import { ServerActionResponse } from '@/server/utils/error'
import { SafeUser } from '@/types'

export async function getSession(): Promise<Session | null> {
  return await auth()
}

export async function getCurrentUser(): Promise<
  ServerActionResponse<SafeUser | null>
> {
  try {
    const session = await getSession()
    if (!session?.user?.email) {
      return { error: 'UNAUTHORIZED' }
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: safeUserSelect,
    })
    if (!currentUser) {
      return { error: 'UNAUTHORIZED' }
    }

    return { data: mapSafeUserDbToSafeUser(currentUser) }
  } catch (error: any) {
    return { error: 'INTERNAL_SERVER_ERROR' }
  }
}
