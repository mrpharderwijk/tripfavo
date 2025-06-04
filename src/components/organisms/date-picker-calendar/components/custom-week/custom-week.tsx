import { ReactElement } from 'react'
import { PropsWithChildren } from 'react'

import { Grid } from '@/components/atoms/layout/grid/grid'

/** Wrapper for the week row */
export function CustomWeek({ children }: PropsWithChildren): ReactElement {
  return (
    <Grid columns={7} data-testid="custom-week">
      {children}
    </Grid>
  )
}
