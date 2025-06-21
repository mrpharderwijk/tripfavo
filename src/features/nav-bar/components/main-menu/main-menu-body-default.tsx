'use client'

import { Globe, Heart, Ticket } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { Button } from '@/components/molecules/buttons/button'
import { ButtonWrapper } from '@/components/molecules/buttons/button-wrapper/button-wrapper'
import { useMainMenuContext } from '@/features/nav-bar/components/main-menu/main-menu-context-provider'
import { useAppContext } from '@/providers/app-context-provider/app-context-provider'
import { getRoutePathByRouteName, isCurrentRoute } from '@/utils/get-route'

export function MainMenuBodyDefault(): ReactElement {
  const pathname = usePathname()
  const { currentUser } = useAppContext()
  const tMainMenuGuest = useTranslations('mainMenu.guest')
  const tMainMenu = useTranslations('mainMenu')
  const { handleOnClickLanguage, closeMainMenu } = useMainMenuContext()

  return (
    <>
      {currentUser && (
        <ButtonWrapper
          icon={Heart}
          size="lg"
          variant={
            !isCurrentRoute(pathname, 'guestFavorites')
              ? 'sidebar-menu-item'
              : 'sidebar-menu-item-active'
          }
          onClick={closeMainMenu}
          renderRoot={({ buttonContent }) => (
            <Link href={getRoutePathByRouteName('guestFavorites')}>
              {buttonContent}
            </Link>
          )}
        >
          {tMainMenuGuest('myFavorites')}
        </ButtonWrapper>
      )}
      {currentUser && (
        <ButtonWrapper
          icon={Ticket}
          size="lg"
          variant={
            !isCurrentRoute(pathname, 'guestReservations')
              ? 'sidebar-menu-item'
              : 'sidebar-menu-item-active'
          }
          onClick={closeMainMenu}
          renderRoot={({ buttonContent }) => (
            <Link href={getRoutePathByRouteName('guestReservations')}>
              {buttonContent}
            </Link>
          )}
        >
          {tMainMenuGuest('myBookings')}
        </ButtonWrapper>
      )}
      <Button
        icon={Globe}
        size="lg"
        variant={
          !isCurrentRoute(pathname, 'language')
            ? 'sidebar-menu-item'
            : 'sidebar-menu-item-active'
        }
        onClick={handleOnClickLanguage}
      >
        {tMainMenu('language')}
      </Button>
    </>
  )
}
