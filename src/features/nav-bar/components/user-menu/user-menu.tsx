'use client'

import { ReactElement } from 'react'

import { UserMenuInternal } from '@/features/nav-bar/components/user-menu/user-menu-internal'
import { DialogContextProvider } from '@/features/nav-bar/providers/dialog-context-provider'

export function UserMenu(): ReactElement {
  return (
    <DialogContextProvider>
      <UserMenuInternal />
    </DialogContextProvider>
  )
}
