import { ReactElement } from 'react'
import { PropsWithChildren } from 'react'

import { Box } from '@/components/atoms/layout/box/box'
import { Body } from '@/components/atoms/typography/body/body'

/** Wrapper for the month caption */
export function CustomMonthCaption({ children }: PropsWithChildren): ReactElement {
  return (
    <Box
      fullWidth
      justify-content="center"
      display="flex"
      align-items="center"
      height={10}
      data-testid="custom-month-caption"
    >
      <Body color="primary" font-weight="bold" text-align="center">
        {children}
      </Body>
    </Box>
  )
}
