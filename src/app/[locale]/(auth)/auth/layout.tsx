import { PropsWithChildren, ReactElement } from 'react'

import { Container } from '@/components/atoms/layout/container/container'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { NavBar } from '@/features/nav-bar/nav-bar'

export default async function AuthLayout({
  children,
}: PropsWithChildren): Promise<ReactElement> {
  return (
    <FlexBox flex-direction="col" fullHeight>
      <FlexBoxItem flex="initial">
        <NavBar />
      </FlexBoxItem>

      <FlexBoxItem
        tag="main"
        margin-top={20}
        padding-t={12}
        padding-b={32}
        flex="auto"
        min-height="full"
      >
        <Container narrow="sm" padding={false}>
          {children}
        </Container>
      </FlexBoxItem>
    </FlexBox>
  )
}
