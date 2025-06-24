'use client'

import { Heart, Ticket } from 'lucide-react'
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
      {currentUser && (
        <ButtonWrapper
          icon={Ticket}
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

      {/* <Button
        icon={Globe}
        size="lg"
        variant={
          !isCurrentRoute(pathname, 'language')
            ? 'sidebar-menu-item'
            : 'sidebar-menu-item-active'
        }
        onClick={handleOnClickLanguage}
      >
        {tCommon('mainMenu.language')}
      </Button> */}
    </>
  )
}
