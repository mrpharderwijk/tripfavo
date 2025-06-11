import { useTranslations } from 'next-intl'
import { PropsWithChildren } from 'react'

import { Box } from '@/components/atoms/layout/box/box'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { GridItem } from '@/components/atoms/layout/grid/components/grid-item/grid-item'
import { Grid } from '@/components/atoms/layout/grid/grid'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { HostMainMenu } from '@/features/host/components/host-main-menu/host-main-menu'
import { HostSidebar } from '@/features/host/components/host-sidebar/host-sidebar'
import { AppShell } from '@/components/molecules/layout/app-shell/app-shell'
import { HostMainMenuBody } from '@/features/host/components/host-main-menu/host-main-menu-body'

export default function RentLayout({ children }: Readonly<PropsWithChildren>) {
  const tHost = useTranslations('host')

  return (
    <AppShell navBarBody={<HostMainMenuBody />} sidebar={<HostSidebar heading={tHost('heading')} />}>
      {children}
    </AppShell>
  )
}
