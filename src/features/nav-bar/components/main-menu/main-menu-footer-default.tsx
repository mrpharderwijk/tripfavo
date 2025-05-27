'use client'

import { LogIn } from 'lucide-react'
import { LogOut, User } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { Button } from '@/components/molecules/buttons/button'
import { useMainMenuContext } from '@/features/nav-bar/components/main-menu/main-menu-context-provider'
import { useAppContext } from '@/providers/app-context-provider/app-context-provider'

export function MainMenuFooterDefault(): ReactElement {
  const { currentUser } = useAppContext()
  const tMainMenu = useTranslations('mainMenu')
  const { handleOnClickSidebarItem, handleOnClickLogout } = useMainMenuContext()

  return (
    <>
      {currentUser && (
        <>
          <Button
            icon={User}
            size="lg"
            variant="sidebar-menu-item-active"
            onClick={() => handleOnClickSidebarItem('account')}
          >
            {tMainMenu('account')}
          </Button>

          <Button
            icon={LogOut}
            size="lg"
            variant="sidebar-menu-item-active"
            onClick={handleOnClickLogout}
          >
            {tMainMenu('logout')}
          </Button>
        </>
      )}

      {!currentUser && (
        <>
          <Button
            icon={LogIn}
            size="lg"
            variant="sidebar-menu-item-active"
            onClick={() => handleOnClickSidebarItem('login')}
          >
            {tMainMenu('login')}
          </Button>
          <Button
            icon={User}
            size="lg"
            variant="sidebar-menu-item-active"
            onClick={() => handleOnClickSidebarItem('signUp')}
          >
            {tMainMenu('signUp')}
          </Button>
        </>
      )}
    </>
  )
}
