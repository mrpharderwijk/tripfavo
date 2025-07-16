import {
  mapSafeUserDbToSafeUser,
  safeUserSelect,
} from '@/features/auth/prisma/safe-user'
import { prisma } from '@/lib/prisma/db'
import { ServerActionResponse } from '@/server/utils/error'
import { SafeUser } from '@/types'

export async function getUserById(
  userId: string,
): Promise<ServerActionResponse<SafeUser | null>> {
  try {
    const currentUser = await prisma.user.findUnique({
      where: {
        id: userId,
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
