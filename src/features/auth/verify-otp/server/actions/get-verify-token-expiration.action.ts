import { isTokenExpired } from '@/features/auth/utils/is-token-expired'
import { prisma } from '@/lib/prisma/db'
import { ServerActionResponse } from '@/server/utils/error'

export async function getVerifyTokenExpiration(
  userId?: string,
): Promise<ServerActionResponse<Date | null>> {
  if (!userId) {
    return { error: 'BAD_REQUEST' }
  }

  const tokenData = await prisma.userVerifyToken.findUnique({
    where: {
      userId,
    },
    select: {
      expires: true,
    },
  })
  if (!tokenData) {
    return { error: 'INTERNAL_SERVER_ERROR' }
  }

  const isExpired = isTokenExpired(tokenData.expires)
  if (isExpired) {
    return { error: 'TOKEN_EXPIRED' }
  }

  return { data: tokenData.expires }
}
