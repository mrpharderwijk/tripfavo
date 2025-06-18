'use client'

import { LogIn } from 'lucide-react'
import { LogOut, User } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { Button } from '@/components/molecules/buttons/button'
import { ButtonWrapper } from '@/components/molecules/buttons/button-wrapper/button-wrapper'
import { useMainMenuContext } from '@/features/nav-bar/components/main-menu/main-menu-context-provider'
import { useAppContext } from '@/providers/app-context-provider/app-context-provider'
import { getRoutePathByRouteName } from '@/utils/get-route'

export function MainMenuFooterDefault(): ReactElement {
  const { currentUser } = useAppContext()
  const tMainMenu = useTranslations('mainMenu')
  const { handleOnClickLogout } = useMainMenuContext()

  return (
    <>
      {currentUser && (
        <>
          <ButtonWrapper
            icon={User}
            size="lg"
            variant="sidebar-menu-item-active"
            renderRoot={({ buttonContent }) => (
              <Link href={getRoutePathByRouteName('account')}>
                {buttonContent}
              </Link>
            )}
          >
            {tMainMenu('account')}
          </ButtonWrapper>

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
          <ButtonWrapper
            icon={LogIn}
            size="lg"
            variant="sidebar-menu-item-active"
            renderRoot={({ buttonContent }) => (
              <Link href={getRoutePathByRouteName('login')}>
                {buttonContent}
              </Link>
            )}
          >
            {tMainMenu('login')}
          </ButtonWrapper>
          <ButtonWrapper
            icon={User}
            size="lg"
            variant="sidebar-menu-item-active"
            renderRoot={({ buttonContent }) => (
              <Link href={getRoutePathByRouteName('signUp')}>
                {buttonContent}
              </Link>
            )}
          >
            {tMainMenu('signUp')}
          </ButtonWrapper>
        </>
      )}
    </>
  )
}
