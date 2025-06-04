import { ReactElement } from 'react'
import { PropsWithChildren } from 'react'

import { GridItem } from '@/components/atoms/layout/grid/components/grid-item/grid-item'

/* WEEKS CONTAINER */
export function CustomWeeks({ children }: PropsWithChildren): ReactElement {
  return (
    <GridItem display="grid" row-span={12} gap={3} data-testid="custom-weeks">
      {children}
    </GridItem>
  )
}
