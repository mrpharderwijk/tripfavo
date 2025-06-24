'use client'

import { CalendarDays, Home } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { ButtonWrapper } from '@/components/molecules/buttons/button-wrapper/button-wrapper'
import { AppShellSidebar } from '@/components/molecules/layout/app-shell/app-shell-sidebar'
import { getRoutePathByRouteName, isCurrentRoute } from '@/utils/get-route'

type GuestSidebarProps = {
  heading?: string
}

export function GuestSidebar({ heading }: GuestSidebarProps): ReactElement {
  const pathname = usePathname()
  const tGuest = useTranslations('guest')

  return (
    <AppShellSidebar heading={heading ?? tGuest('heading')}>
      <FlexBox tag="nav" flex-direction="col">
        <FlexBox tag="ul" flex-direction="col" gap={2} width="full">
          <FlexBoxItem tag="li">
            <ButtonWrapper
              icon={CalendarDays}
              size="lg"
              variant={
                !isCurrentRoute(pathname, 'guestBookings')
                  ? 'sidebar-menu-item'
                  : 'sidebar-menu-item-active'
              }
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
          </FlexBoxItem>

          <FlexBoxItem tag="li">
            <ButtonWrapper
              icon={Home}
              size="lg"
              variant={
                !isCurrentRoute(pathname, 'guestFavorites')
                  ? 'sidebar-menu-item'
                  : 'sidebar-menu-item-active'
              }
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
          </FlexBoxItem>
        </FlexBox>
      </FlexBox>
    </AppShellSidebar>
  )
}
