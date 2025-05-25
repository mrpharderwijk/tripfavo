import { PropsWithChildren } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { NavBar } from '@/features/nav-bar/nav-bar'

export default function DashboardLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <FlexBox flex-direction="col" fullHeight>
      <FlexBoxItem flex="initial">
        <NavBar />
      </FlexBoxItem>

      <FlexBoxItem flex="auto" min-height="full">
        {children}
      </FlexBoxItem>
    </FlexBox>
  )
}
