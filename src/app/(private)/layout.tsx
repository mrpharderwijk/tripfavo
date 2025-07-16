import { PropsWithChildren, ReactElement } from 'react'

import { AuthGuard } from '@/features/auth/components/auth-guard'
import {
  getCurrentUser,
  getSession,
} from '@/features/auth/server/actions/get-current-user'
import { getUserById } from '@/features/auth/server/actions/get-user-by-id'
import { isActionError } from '@/server/utils/error'

export default async function PrivateLayout({
  children,
}: PropsWithChildren): Promise<ReactElement> {
  const currentUserResponse = await getCurrentUser()
  const session = await getSession()
  const currentUser = isActionError(currentUserResponse)
    ? null
    : (currentUserResponse?.data ?? null)

  const dbUserResponse = await getUserById(currentUser?.id ?? '')
  const currentDbUser = isActionError(dbUserResponse)
    ? null
    : (dbUserResponse?.data ?? null)

  return (
    <AuthGuard currentUser={currentDbUser} session={session}>
      {children}
    </AuthGuard>
  )
}
