import { ReactElement } from 'react'

import { DotLoader } from '@/components/atoms/dot-loader/dot-loader'
import { Grid } from '@/components/atoms/layout/grid/grid'

export function DotLoaderPage(): ReactElement {
  return (
    <Grid height="dvh" width="dvw">
      <DotLoader />
    </Grid>
  )
}
