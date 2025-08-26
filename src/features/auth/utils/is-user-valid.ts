import { SafeUser } from '@/types'

export function isUserValid(user: SafeUser): boolean {
  return !!user.email && !user.status?.blocked
}
