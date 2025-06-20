import { PropsWithChildren, ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { AppShellSubnav } from '@/components/molecules/layout/app-shell/app-shell-subnav'

type AppShellBodyProps = PropsWithChildren<{
  subnav?: ReactElement
}>

export function AppShellBody({
  children,
  subnav,
}: AppShellBodyProps): ReactElement {
  return (
    <FlexBox flex-direction="col" gap={2}>
      {subnav && <AppShellSubnav>{subnav}</AppShellSubnav>}
      <FlexBox
        flex-direction="col"
        padding-x={4}
        padding-y={6}
        padding-x-md={20}
        padding-y-md={10}
        gap={6}
        fullHeight
      >
        {children}
      </FlexBox>
    </FlexBox>
  )
}
