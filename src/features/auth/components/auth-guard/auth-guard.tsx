'use client'

import { useRouter } from 'next/navigation'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import { ReactNode, useEffect } from 'react'

import { AuthGuardLoading } from './auth-guard-loading'

import { isUserValid } from '@/features/auth/utils/is-user-valid'
import { SafeUser } from '@/types'

interface AuthGuardProps {
  children: ReactNode
  currentUser: SafeUser | null
  session: Session | null
}

export function AuthGuard({
  children,
  currentUser,
  session,
}: AuthGuardProps): ReactNode {
  const router = useRouter()

  useEffect(() => {
    // If no session, redirect to login
    if (!session) {
      router.push('/auth/login')
      return
    }

    // If user exists but is not valid, sign out and redirect to home
    if (currentUser && !isUserValid(currentUser)) {
      signOut({
        redirect: true,
        callbackUrl: '/',
      })
      return
    }

    // If session exists but no currentUser (user was deleted from DB), sign out
    if (session && !currentUser) {
      signOut({
        redirect: true,
        callbackUrl: '/',
      })
      return
    }
  }, [session, currentUser, router])

  // Don't render children if not authenticated or user is invalid
  if (!session || (currentUser && !isUserValid(currentUser))) {
    return <AuthGuardLoading />
  }

  return children
}
