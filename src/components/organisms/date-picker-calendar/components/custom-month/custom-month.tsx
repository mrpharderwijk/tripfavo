import { ReactElement } from 'react'
import { PropsWithChildren } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'

/** Wrapper for the month */
export function CustomMonth({ children }: PropsWithChildren): ReactElement {
  return (
    <FlexBox flex-direction="col" gap-y={4} fullWidth data-testid="custom-month">
      {children}
    </FlexBox>
  )
}
