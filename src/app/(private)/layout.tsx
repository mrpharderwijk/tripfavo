import { PropsWithChildren, ReactNode } from 'react'

import { getCurrentUser } from '@/features/auth/server/actions/get-current-user'
import { SignOut } from '@/features/auth/sign-out/sign-out'
import { isUserValid } from '@/features/auth/utils/is-user-valid'
import { isActionError } from '@/server/utils/error'

export default async function PrivateLayout({
  children,
}: PropsWithChildren): Promise<ReactNode> {
  try {
    const currentUserResponse = await getCurrentUser()
    const currentUser = isActionError(currentUserResponse)
      ? null
      : (currentUserResponse?.data ?? null)
    if (!currentUser || !isUserValid(currentUser)) {
      return <SignOut>{children}</SignOut>
    }
  } catch (error) {
    console.error(error)
    return <SignOut>{children}</SignOut>
  }

  return children
}
