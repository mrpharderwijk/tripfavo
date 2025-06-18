import { ReactElement } from 'react'
import { PropsWithChildren } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'

/** Wrapper for the month grid */
export function CustomMonthGrid({ children }: PropsWithChildren): ReactElement {
  return (
    <FlexBox
      flex-direction="col"
      gap={4}
      fullWidth
      data-testid="custom-month-grid"
    >
      {children}
    </FlexBox>
  )
}
