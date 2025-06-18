import { isBefore } from 'date-fns'

export function isTokenExpired(expires?: Date | null): boolean {
  if (!expires) {
    return true
  }

  return isBefore(expires, new Date()) ? true : false
}
