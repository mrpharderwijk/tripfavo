import { SafeUserDb } from '@/features/auth/prisma/safe-user'

export function isUserOnboard(user: SafeUserDb | null): boolean {
  return !!user?.name?.firstName && !!user?.name?.lastName
}
