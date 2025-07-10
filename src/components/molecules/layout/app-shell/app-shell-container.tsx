import { PropsWithChildren, ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'

export function AppShellContainer({
  children,
}: PropsWithChildren): ReactElement {
  return (
    <FlexBox
      flex-direction="col"
      padding-y={6}
      padding-y-md={10}
      gap={6}
      fullHeight
    >
      {children}
    </FlexBox>
  )
}
