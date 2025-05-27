'use client'

import { CalendarDays, Globe, House } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { Button } from '@/components/molecules/buttons/button'
import { useMainMenuContext } from '@/features/nav-bar/components/main-menu/main-menu-context-provider'
import { useAppContext } from '@/providers/app-context-provider/app-context-provider'
import { isCurrentRoute } from '@/utils/get-route'

export function HostMainMenuBody(): ReactElement {
  const pathname = usePathname()
  const { currentUser } = useAppContext()
  const { handleOnClickSidebarItem, handleOnClickLanguage } = useMainMenuContext()
  const tMainMenuHost = useTranslations('mainMenu.host')
  const tMainMenu = useTranslations('mainMenu')

  return (
    <>
      {currentUser && (
        <Button
          icon={House}
          size="lg"
          variant={
            !isCurrentRoute(pathname, 'myListings')
              ? 'sidebar-menu-item'
              : 'sidebar-menu-item-active'
          }
          onClick={() => handleOnClickSidebarItem('myListings')}
        >
          {tMainMenuHost('myListings')}
        </Button>
      )}

      {currentUser && (
        <Button
          icon={CalendarDays}
          size="lg"
          variant={
            !isCurrentRoute(pathname, 'myReservations')
              ? 'sidebar-menu-item'
              : 'sidebar-menu-item-active'
          }
          onClick={() => handleOnClickSidebarItem('myReservations')}
        >
          {tMainMenuHost('myReservations')}
        </Button>
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
