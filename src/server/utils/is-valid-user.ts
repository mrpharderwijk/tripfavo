import { UserRole } from '@prisma/client'

import { getSession } from '@/features/auth/server/actions/get-current-user'

/**
 * Check if the user is valid to make a mutation on the user's record
 * @param userId - The record of the userId to mutate
 * @returns boolean
 */
export async function isUserValid(userId: string): Promise<boolean> {
  const session = await getSession()
  if (!session?.user?.id) {
    return false
  }

  // When the logged in user is not the same as the userId, check its role
  if (session.user.id !== userId) {
    return session?.user?.role?.includes(UserRole.ADMIN) ?? false
  }

  return session.user.id === userId
}
