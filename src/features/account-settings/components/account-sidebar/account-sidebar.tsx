'use client'

import { UserIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { getRoutePathByRouteName, isCurrentRoute } from '@/utils/get-route'
import { ButtonWrapper } from '@/components/molecules/buttons/button-wrapper/button-wrapper'
import Link from 'next/link'
import { AppShellSidebar } from '@/components/molecules/layout/app-shell/app-shell-sidebar'

type AccountSidebarProps = {
  heading?: string
}

export function AccountSidebar({ heading }: AccountSidebarProps): ReactElement {
  const pathname = usePathname()
  const tAccount = useTranslations('account')

  return (
    <AppShellSidebar heading={heading ?? tAccount('heading')}>
      <FlexBox tag="nav" flex-direction="col">
        <FlexBox tag="ul" flex-direction="col" gap={2} width="full">
          <FlexBoxItem tag="li">
            <ButtonWrapper
              icon={UserIcon}
              size="lg"
              variant={
                !isCurrentRoute(pathname, 'personalInfo')
                  ? 'sidebar-menu-item'
                  : 'sidebar-menu-item-active'
              }
              renderRoot={({ buttonContent }) => (
                <Link href={getRoutePathByRouteName('personalInfo')}>
                  {buttonContent}
                </Link>
              )}
            >
              {tAccount('sidebar.personalInfo')}
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
