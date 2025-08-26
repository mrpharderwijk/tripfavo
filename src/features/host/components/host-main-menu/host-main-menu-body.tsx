'use client'

import { Home, House, Ticket } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { ButtonWrapper } from '@/components/molecules/buttons/button-wrapper/button-wrapper'
import { useMainMenuContext } from '@/features/nav-bar/components/main-menu/main-menu-context-provider'
import { useAppContext } from '@/providers/app-context-provider/app-context-provider'
import { getRoutePathByRouteName, isCurrentRoute } from '@/utils/get-route'

export function HostMainMenuBody(): ReactElement {
  const pathname = usePathname()
  const { currentUser } = useAppContext()
  const { closeMainMenu, handleOnClickLanguage } = useMainMenuContext()
  const tHost = useTranslations('host')
  const tCommon = useTranslations('common')

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
          icon={House}
          size="lg"
          variant={
            !isCurrentRoute(pathname, 'hostProperties')
              ? 'sidebar-menu-item'
              : 'sidebar-menu-item-active'
          }
          onClick={closeMainMenu}
          renderRoot={({ buttonContent }) => (
            <Link
              className="w-full"
              href={getRoutePathByRouteName('hostProperties')}
            >
              {buttonContent}
            </Link>
          )}
        >
          {tHost('mainMenu.myProperties')}
        </ButtonWrapper>
      )}

      {currentUser && (
        <ButtonWrapper
          icon={Ticket}
          size="lg"
          variant={
            !isCurrentRoute(pathname, 'hostBookings')
              ? 'sidebar-menu-item'
              : 'sidebar-menu-item-active'
          }
          onClick={closeMainMenu}
          renderRoot={({ buttonContent }) => (
            <Link
              className="w-full"
              href={getRoutePathByRouteName('hostBookings')}
            >
              {buttonContent}
            </Link>
          )}
        >
          {tHost('mainMenu.myBookings')}
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
