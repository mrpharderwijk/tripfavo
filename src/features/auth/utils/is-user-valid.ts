import { SafeUser } from '@/types'

export function isUserValid(user: SafeUser | null): boolean {
  return !!user?.email && !user?.status?.blocked && !!user?.emailVerified
}
