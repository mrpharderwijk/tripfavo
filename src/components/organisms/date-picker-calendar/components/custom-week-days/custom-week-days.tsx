import { ReactElement } from 'react'
import { PropsWithChildren } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { GridItem } from '@/components/atoms/layout/grid/components/grid-item/grid-item'

export function CustomWeekdays({ children }: PropsWithChildren): ReactElement {
  return (
    <GridItem row-span={1} data-testid="custom-weekdays">
      <FlexBox flex-direction="row" gap={1}>
        {children}
      </FlexBox>
    </GridItem>
  )
}
