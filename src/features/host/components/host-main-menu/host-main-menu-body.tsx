'use client'

import { CalendarDays, Globe, House } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { Button } from '@/components/molecules/buttons/button'
import { ButtonWrapper } from '@/components/molecules/buttons/button-wrapper/button-wrapper'
import { useMainMenuContext } from '@/features/nav-bar/components/main-menu/main-menu-context-provider'
import { useAppContext } from '@/providers/app-context-provider/app-context-provider'
import { getRoutePathByRouteName, isCurrentRoute } from '@/utils/get-route'

export function HostMainMenuBody(): ReactElement {
  const pathname = usePathname()
  const { currentUser } = useAppContext()
  const { closeMainMenu, handleOnClickLanguage } = useMainMenuContext()
  const tMainMenuHost = useTranslations('mainMenu.host')
  const tMainMenu = useTranslations('mainMenu')

  return (
    <>
      {currentUser && (
        <ButtonWrapper
          icon={House}
          size="lg"
          variant={
            !isCurrentRoute(pathname, 'myListings')
              ? 'sidebar-menu-item'
              : 'sidebar-menu-item-active'
          }
          onClick={closeMainMenu}
          renderRoot={({ buttonContent }) => (
            <Link href={getRoutePathByRouteName('myListings')}>{buttonContent}</Link>
          )}
        >
          {tMainMenuHost('myListings')}
        </ButtonWrapper>
      )}

      {currentUser && (
        <ButtonWrapper
          icon={CalendarDays}
          size="lg"
          variant={
            !isCurrentRoute(pathname, 'myReservations')
              ? 'sidebar-menu-item'
              : 'sidebar-menu-item-active'
          }
          onClick={closeMainMenu}
          renderRoot={({ buttonContent }) => (
            <Link href={getRoutePathByRouteName('myReservations')}>{buttonContent}</Link>
          )}
        >
          {tMainMenuHost('myReservations')}
        </ButtonWrapper>
      )}

      <Button
        icon={Globe}
        size="lg"
        variant={
          !isCurrentRoute(pathname, 'language') ? 'sidebar-menu-item' : 'sidebar-menu-item-active'
        }
        onClick={handleOnClickLanguage}
      >
        {tMainMenu('language')}
      </Button>
    </>
  )
}
