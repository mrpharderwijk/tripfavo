'use client'

import { House } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { Button } from '@/components/molecules/buttons/button'
import { routes } from '@/constants/routes'
import { isCurrentRoute } from '@/utils/get-route'

export function HostSidebar(): ReactElement {
  const router = useRouter()
  const pathname = usePathname()
  const tHost = useTranslations('host')

  function handleOnClickSidebarItem(path?: string): void {
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
            icon={House}
            size="lg"
            variant={
              !isCurrentRoute(pathname, 'myListings')
                ? 'sidebar-menu-item'
                : 'sidebar-menu-item-active'
            }
            onClick={() => handleOnClickSidebarItem(routes.host?.children?.myListings?.path)}
          >
            {tHost('sidebar.myListings')}
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
