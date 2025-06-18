import { type VariantProps } from 'class-variance-authority'
import { PropsWithChildren, ReactElement, RefObject } from 'react'

import { boxClassnames } from './box.class-names'

import { ElementTag, PropsWithTestId } from '@/types'
import { cn } from '@/utils/class-names'

export type BoxProps = VariantProps<typeof boxClassnames> &
  PropsWithChildren<
    PropsWithTestId<
      | ElementTag
      | {
          tag?: 'ul' | 'li'
        }
    > & { ref?: RefObject<any>; id?: string; tabIndex?: number }
  >

export function Box({
  tag = 'div',
  id,
  children,
  'data-testid': testId,
  ref,
  tabIndex,
  ...boxProps
}: BoxProps): ReactElement {
  const Tag = tag
  const boxClassName = cn(
    boxClassnames({ ...boxProps }),
    ...['scrollbar-hidden'],
  )

  return (
    <Tag
      id={id}
      data-testid={testId}
      className={boxClassName}
      ref={ref}
      tabIndex={tabIndex}
    >
      {children}
    </Tag>
  )
}
