import { PropsWithChildren, ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'

type AppShellContainerItemProps = PropsWithChildren<{
  fullWidthMobile?: boolean
}>

export function AppShellContainerItem({
  children,
  fullWidthMobile = false,
}: AppShellContainerItemProps): ReactElement {
  return (
    <FlexBox
      flex-direction="col"
      padding-x={fullWidthMobile ? 0 : 4}
      padding-x-md={20}
    >
      {children}
    </FlexBox>
  )
}
