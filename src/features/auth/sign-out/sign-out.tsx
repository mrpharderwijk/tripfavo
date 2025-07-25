'use client'

import { signOut } from 'next-auth/react'
import { PropsWithChildren, ReactNode } from 'react'

export async function SignOut({
  children,
}: PropsWithChildren): Promise<ReactNode> {
  try {
    await signOut()
    console.log('signOut')
  } catch (error) {
    console.log(error)
  }

  return children
}
