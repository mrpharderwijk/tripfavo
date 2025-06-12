'use client'

import { CalendarDays, House } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { getRoutePathByRouteName, isCurrentRoute } from '@/utils/get-route'
import { AppShellSidebar } from '@/components/molecules/layout/app-shell/app-shell-sidebar'
import { ButtonWrapper } from '@/components/molecules/buttons/button-wrapper/button-wrapper'
import Link from 'next/link'

type HostSidebarProps = {
  heading?: string
}

export function HostSidebar({ heading }: HostSidebarProps): ReactElement {
  const pathname = usePathname()
  const tMainMenuHost = useTranslations('mainMenu.host')
  const tHost = useTranslations('host')

  return (
    <AppShellSidebar heading={heading ?? tHost('heading')}>
      <FlexBox tag="nav" flex-direction="col">
        <FlexBox tag="ul" flex-direction="col" gap={2} width="full">
          <FlexBoxItem tag="li">
            <ButtonWrapper
              icon={House}
              size="lg"
              variant={
                !isCurrentRoute(pathname, 'myListings')
                  ? 'sidebar-menu-item'
                  : 'sidebar-menu-item-active'
              }
              renderRoot={({ buttonContent }) => (
                <Link href={getRoutePathByRouteName('myListings')}>
                  {buttonContent}
                </Link>
              )}
            >
              {tMainMenuHost('myListings')}
            </ButtonWrapper>
          </FlexBoxItem>

          <FlexBoxItem tag="li">
            <ButtonWrapper
              icon={CalendarDays}
              size="lg"
              variant={
                !isCurrentRoute(pathname, 'myReservations')
                  ? 'sidebar-menu-item'
                  : 'sidebar-menu-item-active'
              }
              renderRoot={({ buttonContent }) => (
                <Link href={getRoutePathByRouteName('myReservations')}>
                  {buttonContent}
                </Link>
              )}
            >
              {tMainMenuHost('myReservations')}
            </ButtonWrapper>
          </FlexBoxItem>

          {/* <FlexBoxItem tag="li">
            <Button icon={UserIcon} size="lg" variant="sidebar-menu-item">
              Personal information
            </Button>
          </FlexBoxItem> */}
        </FlexBox>
      </FlexBox>
    </AppShellSidebar>
  )
}
