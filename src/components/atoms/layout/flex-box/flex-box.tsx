import { VariantProps } from 'class-variance-authority'
import { PropsWithChildren, ReactElement } from 'react'

import { Box } from '@/components/atoms/layout/box/box'
import { flexBoxClassNames } from '@/components/atoms/layout/flex-box/flex-box.class-names'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'

export type FlexBoxProps = PropsWithChildren<VariantProps<typeof flexBoxClassNames>>

function FlexBox({ children, ...props }: FlexBoxProps): ReactElement {
  return (
    <Box {...props} display="flex">
      {children}
    </Box>
  )
}

FlexBox.Item = FlexBoxItem

export { FlexBox }
