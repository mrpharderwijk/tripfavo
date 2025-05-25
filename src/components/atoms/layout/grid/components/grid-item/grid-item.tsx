import { VariantProps } from 'class-variance-authority'
import { PropsWithChildren, ReactElement } from 'react'

import { gridItemClassNames } from '@/components/atoms/layout/grid/components/grid-item/grid-item.class-names'
import { ElementTag, PropsWithTestId } from '@/types'
import { cn } from '@/utils/class-names'

export type GridItemProps = PropsWithChildren<
  PropsWithTestId<VariantProps<typeof gridItemClassNames> & ElementTag>
>

export function GridItem({
  children,
  'data-testid': dataTestId,
  ...gridItemProps
}: GridItemProps): ReactElement {
  const gridItemClassName = cn(gridItemClassNames({ ...gridItemProps }))
  const Tag = gridItemProps.tag ?? 'div'

  return (
    <Tag className={gridItemClassName} data-testid={dataTestId}>
      {children}
    </Tag>
  )
}
