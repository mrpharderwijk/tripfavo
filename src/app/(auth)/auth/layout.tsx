import { PropsWithChildren, ReactElement } from 'react'

import { Container } from '@/components/atoms/layout/container/container'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { AppShell } from '@/components/molecules/layout/app-shell/app-shell'
import { NavBar } from '@/features/nav-bar/nav-bar'

export default async function AuthLayout({
  children,
}: PropsWithChildren): Promise<ReactElement> {
  return (
    <AppShell navbar={<NavBar />}>
      <FlexBoxItem
        tag="main"
        margin-top={20}
        padding-top={12}
        padding-bottom={32}
        flex="auto"
        min-height="full"
      >
        <Container narrow="sm" padding={false}>
          {children}
        </Container>
      </FlexBoxItem>
    </AppShell>
  )
}
