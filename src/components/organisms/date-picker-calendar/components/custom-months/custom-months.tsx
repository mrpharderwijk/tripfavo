import { ReactElement } from 'react'
import { PropsWithChildren } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'

/** Wrapper for the months */
export function CustomMonths({ children }: PropsWithChildren): ReactElement {
  return (
    <FlexBox flex-direction="col" fullWidth data-testid="custom-months">
      {children}
    </FlexBox>
  )
}
