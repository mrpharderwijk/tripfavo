'use client'

import { signOut } from 'next-auth/react'
import { PropsWithChildren, ReactNode } from 'react'

export function SignOut({ children }: PropsWithChildren): ReactNode {
  try {
    signOut({ redirectTo: '/' })
  } catch (error) {
    console.log(error)
  }

  return children
}
