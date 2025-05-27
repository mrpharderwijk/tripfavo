'use client'

import { Globe, Heart, LayoutDashboard, Ticket } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { Button } from '@/components/molecules/buttons/button'
import { useMainMenuContext } from '@/features/nav-bar/components/main-menu/main-menu-context-provider'
import { useAppContext } from '@/providers/app-context-provider/app-context-provider'
import { isCurrentRoute } from '@/utils/get-route'

export function MainMenuBodyDefault(): ReactElement {
  const pathname = usePathname()
  const { currentUser } = useAppContext()
  const tMainMenuGuest = useTranslations('mainMenu.guest')
  const tMainMenu = useTranslations('mainMenu')
  const { handleOnClickSidebarItem, handleOnClickLanguage } = useMainMenuContext()

  return (
    <>
      {currentUser && (
        <Button
          icon={LayoutDashboard}
          size="lg"
          variant={
            !isCurrentRoute(pathname, 'guest') ? 'sidebar-menu-item' : 'sidebar-menu-item-active'
          }
          onClick={() => handleOnClickSidebarItem('guest')}
        >
          {tMainMenuGuest('dashboard')}
        </Button>
      )}
      {currentUser && (
        <Button
          icon={Heart}
          size="lg"
          variant={
            !isCurrentRoute(pathname, 'myFavorites')
              ? 'sidebar-menu-item'
              : 'sidebar-menu-item-active'
          }
          onClick={() => handleOnClickSidebarItem('myFavorites')}
        >
          {tMainMenuGuest('myFavorites')}
        </Button>
      )}
      {currentUser && (
        <Button
          icon={Ticket}
          size="lg"
          variant={
            !isCurrentRoute(pathname, 'myTrips') ? 'sidebar-menu-item' : 'sidebar-menu-item-active'
          }
          onClick={() => handleOnClickSidebarItem('myTrips')}
        >
          {tMainMenuGuest('myTrips')}
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
