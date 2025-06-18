import { VariantProps } from 'class-variance-authority'
import { PropsWithChildren, ReactElement } from 'react'

import { gridClassNames } from '@/components/atoms/layout/grid/grid.class-names'
import { PropsWithTestId } from '@/types'
import { cn } from '@/utils/class-names'

export type GridProps = PropsWithChildren<
  PropsWithTestId<VariantProps<typeof gridClassNames>>
>

export function Grid({
  children,
  'data-testid': dataTestId,
  ...gridProps
}: GridProps): ReactElement {
  const gridClassName = cn(gridClassNames({ ...gridProps }))

  return (
    <div className={gridClassName} data-testid={dataTestId}>
      {children}
    </div>
  )
}
