'use client'

import { CalendarDays, Home } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { ButtonWrapper } from '@/components/molecules/buttons/button-wrapper/button-wrapper'
import { getRoutePathByRouteName, isCurrentRoute } from '@/utils/get-route'

export function GuestSidebar(): ReactElement {
  const router = useRouter()
  const pathname = usePathname()
  const tMainMenuGuest = useTranslations('mainMenu.guest')

  return (
    <FlexBox tag="nav" flex-direction="col">
      <FlexBox tag="ul" flex-direction="col" gap={2} width="full">
        <FlexBoxItem tag="li">
          <ButtonWrapper
            icon={CalendarDays}
            size="lg"
            variant={
              !isCurrentRoute(pathname, 'myBookings')
                ? 'sidebar-menu-item'
                : 'sidebar-menu-item-active'
            }
            renderRoot={({ buttonContent }) => (
              <Link href={getRoutePathByRouteName('myBookings')}>{buttonContent}</Link>
            )}
          >
            {tMainMenuGuest('myTrips')}
          </ButtonWrapper>
        </FlexBoxItem>

        <FlexBoxItem tag="li">
          <ButtonWrapper
            icon={Home}
            size="lg"
            variant={
              !isCurrentRoute(pathname, 'myFavorites')
                ? 'sidebar-menu-item'
                : 'sidebar-menu-item-active'
            }
            renderRoot={({ buttonContent }) => (
              <Link href={getRoutePathByRouteName('myFavorites')}>{buttonContent}</Link>
            )}
          >
            {tMainMenuGuest('myFavorites')}
          </ButtonWrapper>
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
