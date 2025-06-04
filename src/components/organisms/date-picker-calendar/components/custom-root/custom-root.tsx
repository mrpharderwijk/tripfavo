import { PropsWithChildren } from 'react'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'

/** Wrapper container for the DayPicker component */
export function CustomRoot({ children }: PropsWithChildren): ReactElement {
  return (
    <FlexBox fullWidth data-testid="custom-root">
      {children}
    </FlexBox>
  )
}
