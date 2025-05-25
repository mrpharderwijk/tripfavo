'use client'

import { UserIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { Button } from '@/components/molecules/buttons/button'
import { routes } from '@/constants/routes'
import { isCurrentRoute } from '@/utils/get-route'

export function AccountSidebar(): ReactElement {
  const router = useRouter()
  const pathname = usePathname()
  const tAccount = useTranslations('account')
  const handleOnClickSidebarItem = (path?: string) => {
    if (!path) {
      return
    }

    if (pathname.includes(path)) {
      return
    }

    router.push(path)
  }

  return (
    <FlexBox tag="nav" flex-direction="col">
      <FlexBox tag="ul" flex-direction="col" gap={2} width="full">
        <FlexBoxItem tag="li">
          <Button
            icon={UserIcon}
            size="lg"
            variant={
              !isCurrentRoute(pathname, 'personalInfo')
                ? 'sidebar-menu-item'
                : 'sidebar-menu-item-active'
            }
            onClick={() => handleOnClickSidebarItem(routes.account?.children?.personalInfo?.path)}
          >
            {tAccount('sidebar.personalInfo')}
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
