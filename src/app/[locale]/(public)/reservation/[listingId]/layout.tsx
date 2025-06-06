import { PropsWithChildren } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { Footer } from '@/components/molecules/footer/footer'
import { NavBar } from '@/features/nav-bar/nav-bar'

export default function ReservationDetailLayout({ children }: PropsWithChildren) {
  return (
    <FlexBox flex-direction="col" fullHeight>
      <FlexBoxItem flex="initial">
        <NavBar narrow fixed={false} minimal />
      </FlexBoxItem>

      <FlexBoxItem tag="main" padding-b={32} flex="auto" min-height="full">
        {children}

        <Footer />
      </FlexBoxItem>
    </FlexBox>
  )
}
