import { ReactElement } from 'react'

import { Container } from '@/components/atoms/layout/container/container'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { NavBar } from '@/features/nav-bar/nav-bar'

export default function HomeLayout({
  children,
}: {
  children: ReactElement
}): ReactElement {
  return (
    <FlexBox flex-direction="col" fullHeight>
      <FlexBoxItem flex="initial">
        <NavBar />
      </FlexBoxItem>

      <FlexBoxItem
        tag="main"
        margin-top={20}
        padding-top={12}
        padding-bottom={32}
        flex="auto"
        min-height="full"
      >
        <Container fullHeight>{children}</Container>
      </FlexBoxItem>
    </FlexBox>
  )
}
