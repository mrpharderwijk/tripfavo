'use client'

import { CalendarDays, House } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { Button } from '@/components/molecules/buttons/button'
import { getRoutePathByRouteName, isCurrentRoute } from '@/utils/get-route'

export function GuestSidebar(): ReactElement {
  const router = useRouter()
  const pathname = usePathname()
  const tMainMenuGuest = useTranslations('mainMenu.guest')

  function handleOnClickSidebarItem(routeName?: string): void {
    if (!routeName) {
      return
    }

    const routerPath = getRoutePathByRouteName(routeName)
    if (routerPath.includes(pathname)) {
      return
    }

    router.push(routerPath)
  }

  return (
    <FlexBox tag="nav" flex-direction="col">
      <FlexBox tag="ul" flex-direction="col" gap={2} width="full">
        <FlexBoxItem tag="li">
          <Button
            icon={House}
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
        </FlexBoxItem>

        <FlexBoxItem tag="li">
          <Button
            icon={CalendarDays}
            size="lg"
            variant={
              !isCurrentRoute(pathname, 'myTrips')
                ? 'sidebar-menu-item'
                : 'sidebar-menu-item-active'
            }
            onClick={() => handleOnClickSidebarItem('myTrips')}
          >
            {tMainMenuGuest('myTrips')}
          </Button>
        </FlexBoxItem>

        {/* <FlexBoxItem tag="li">
          <Button icon={UserIcon} size="lg" variant="sidebar-menu-item">
            Personal information
          </Button>
        </FlexBoxItem> */}
      </FlexBox>
    </FlexBox>
  )
}
