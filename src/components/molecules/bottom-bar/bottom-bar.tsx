import { VariantProps } from 'class-variance-authority'
import { PropsWithChildren, ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { flexBoxClassNames } from '@/components/atoms/layout/flex-box/flex-box.class-names'

type BottomBarProps = PropsWithChildren<{
  'bg-color': VariantProps<typeof flexBoxClassNames>['bg-color']
}>

export function BottomBar({ children, 'bg-color': bgColor }: BottomBarProps): ReactElement {
  return (
    <FlexBox
      position="fixed"
      right={0}
      bottom={0}
      left={0}
      flex-direction="col"
      bg-color={bgColor}
      border-t={1}
      border-color="tertiary"
      z-index={50}
    >
      <FlexBox
        flex-direction="row"
        align-items="center"
        padding-x={6}
        padding-x-md={12}
        padding-y={4}
      >
        {children}
      </FlexBox>
    </FlexBox>
  )
}
