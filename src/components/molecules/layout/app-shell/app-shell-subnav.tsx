import { PropsWithChildren, ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'

export function AppShellSubnav({ children }: PropsWithChildren): ReactElement {
  return (
    <FlexBox
      border-b={1}
      border-color="deco"
      padding-x={4}
      padding-y={4}
      padding-x-md={20}
    >
      {children}
    </FlexBox>
  )
}
