import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { Footer } from '@/components/molecules/footer/footer'
import { NavBar } from '@/features/nav-bar/nav-bar'

export default function ListingDetailLayout({ children }: { children: ReactElement }) {
  return (
    <FlexBox flex-direction="col" fullHeight>
      <FlexBoxItem flex="initial">
        <NavBar narrow />
      </FlexBoxItem>

      <FlexBoxItem
        tag="main"
        margin-top={20}
        padding-t={12}
        padding-b={32}
        flex="auto"
        min-height="full"
      >
        {children}
      </FlexBoxItem>

      <Footer />
    </FlexBox>
  )
}
