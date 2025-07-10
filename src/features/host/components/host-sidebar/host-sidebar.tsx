'use client'

import { House, Ticket } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { ButtonWrapper } from '@/components/molecules/buttons/button-wrapper/button-wrapper'
import { AppShellSidebar } from '@/components/molecules/layout/app-shell/app-shell-sidebar'
import { getRoutePathByRouteName, isCurrentRoute } from '@/utils/get-route'

type HostSidebarProps = {
  heading?: string
}

export function HostSidebar({ heading }: HostSidebarProps): ReactElement {
  const pathname = usePathname()
  const tHost = useTranslations('host')

  return (
    <AppShellSidebar heading={heading ?? tHost('heading')}>
      <FlexBox tag="nav" flex-direction="col">
        <FlexBox tag="ul" flex-direction="col" gap={2} fullWidth>
          <FlexBoxItem tag="li">
            <ButtonWrapper
              icon={House}
              size="lg"
              variant={
                !isCurrentRoute(pathname, 'hostProperties')
                  ? 'sidebar-menu-item'
                  : 'sidebar-menu-item-active'
              }
              renderRoot={({ buttonContent }) => (
                <Link
                  className="w-full"
                  href={getRoutePathByRouteName('hostProperties')}
                >
                  {buttonContent}
                </Link>
              )}
              fullWidth
            >
              {tHost('mainMenu.myProperties')}
            </ButtonWrapper>
          </FlexBoxItem>

          <FlexBoxItem tag="li">
            <ButtonWrapper
              icon={Ticket}
              size="lg"
              variant={
                !isCurrentRoute(pathname, 'hostBookings')
                  ? 'sidebar-menu-item'
                  : 'sidebar-menu-item-active'
              }
              renderRoot={({ buttonContent }) => (
                <Link
                  className="w-full"
                  href={getRoutePathByRouteName('hostBookings')}
                >
                  {buttonContent}
                </Link>
              )}
              fullWidth
            >
              {tHost('mainMenu.myBookings')}
            </ButtonWrapper>
          </FlexBoxItem>
        </FlexBox>
      </FlexBox>
    </AppShellSidebar>
  )
}
