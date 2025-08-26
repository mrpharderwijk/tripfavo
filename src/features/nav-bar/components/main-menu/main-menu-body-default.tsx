'use client'

import { CalendarDays, Heart, Home } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { ButtonWrapper } from '@/components/molecules/buttons/button-wrapper/button-wrapper'
import { useMainMenuContext } from '@/features/nav-bar/components/main-menu/main-menu-context-provider'
import { useAppContext } from '@/providers/app-context-provider/app-context-provider'
import { getRoutePathByRouteName, isCurrentRoute } from '@/utils/get-route'

export function MainMenuBodyDefault(): ReactElement {
  const pathname = usePathname()
  const { currentUser } = useAppContext()
  const tGuest = useTranslations('guest')
  const tCommon = useTranslations('common')
  const { handleOnClickLanguage, closeMainMenu } = useMainMenuContext()

  return (
    <>
      <ButtonWrapper
        data-testid="main-menu-home"
        icon={Home}
        size="lg"
        variant={
          !isCurrentRoute(pathname, 'home')
            ? 'sidebar-menu-item'
            : 'sidebar-menu-item-active'
        }
        onClick={closeMainMenu}
        renderRoot={({ buttonContent }) => (
          <Link className="w-full" href="/">
            {buttonContent}
          </Link>
        )}
      >
        {tCommon('mainMenu.home')}
      </ButtonWrapper>

      {currentUser && (
        <ButtonWrapper
          icon={CalendarDays}
          size="lg"
          variant={
            !isCurrentRoute(pathname, 'guestBookings')
              ? 'sidebar-menu-item'
              : 'sidebar-menu-item-active'
          }
          onClick={closeMainMenu}
          renderRoot={({ buttonContent }) => (
            <Link
              className="w-full"
              href={getRoutePathByRouteName('guestBookings')}
            >
              {buttonContent}
            </Link>
          )}
        >
          {tGuest('mainMenu.myBookings')}
        </ButtonWrapper>
      )}

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
            <Link
              className="w-full"
              href={getRoutePathByRouteName('guestFavorites')}
            >
              {buttonContent}
            </Link>
          )}
        >
          {tGuest('mainMenu.myFavorites')}
        </ButtonWrapper>
      )}
    </>
  )
}
