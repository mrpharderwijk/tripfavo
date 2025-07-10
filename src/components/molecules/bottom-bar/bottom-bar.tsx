import { VariantProps } from 'class-variance-authority'
import { PropsWithChildren, ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { flexBoxClassNames } from '@/components/atoms/layout/flex-box/flex-box.class-names'

type BottomBarProps = PropsWithChildren<{
  'bg-color'?: VariantProps<typeof flexBoxClassNames>['bg-color']
  fixed?: boolean
}>

export function BottomBar({
  children,
  'bg-color': bgColor = 'primary',
  fixed = true,
}: BottomBarProps): ReactElement {
  return (
    <FlexBox
      position={fixed ? 'fixed' : 'relative'}
      right={0}
      bottom={0}
      left={0}
      flex-direction="col"
      bg-color={bgColor}
      border-t={1}
      border-color="tertiary"
      z-index={40}
    >
      <FlexBox
        flex-direction="col"
        flex-direction-sm="row"
        align-items="center"
        padding-x={6}
        padding-x-md={12}
        padding-y={4}
        gap={2}
      >
        {children}
      </FlexBox>
    </FlexBox>
  )
}
