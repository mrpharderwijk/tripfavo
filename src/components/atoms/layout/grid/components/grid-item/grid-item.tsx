import { VariantProps } from 'class-variance-authority'
import { PropsWithChildren, ReactElement } from 'react'

import { gridItemClassNames } from '@/components/atoms/layout/grid/components/grid-item/grid-item.class-names'
import { PropsWithTestId } from '@/types'
import { cn } from '@/utils/class-names'

export type GridItemProps = PropsWithChildren<
  PropsWithTestId<VariantProps<typeof gridItemClassNames>>
>

export function GridItem({
  children,
  'data-testid': dataTestId,
  ...gridItemProps
}: GridItemProps): ReactElement {
  const gridItemClassName = cn(gridItemClassNames({ ...gridItemProps }))

  return (
    <div className={gridItemClassName} data-testid={dataTestId}>
      {children}
    </div>
  )
}
