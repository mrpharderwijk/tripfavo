/**
 * This import is needed
 */
// eslint-disable-next-line unused-imports/no-unused-imports
import { UserRole, UserStatus } from '@prisma/client'

import { SafeUserDb } from '@/features/auth/prisma/safe-user'

/**
 * Extends the `Session` type from `next-auth` to include
 * a custom `User` type
 */
declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    expires: string
    id: string
    sessionToken: string
    user: SafeUserDb
  }

  interface User extends SafeUserDb {}
}
