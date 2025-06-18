import { VariantProps } from 'class-variance-authority'
import { PropsWithChildren, ReactElement } from 'react'

import { containerClassNames } from '@/components/atoms/layout/container/container.class-names'
import { ElementTag, PropsWithTestId } from '@/types'
import { cn } from '@/utils/class-names'

type ContainerElementTag = ElementTag
type ContainerProps = PropsWithChildren<
  PropsWithTestId<
    VariantProps<typeof containerClassNames> & ContainerElementTag
  >
>

export function Container({
  'data-testid': dataTestId,
  tag = 'div',
  padding = true,
  fullWidth,
  narrow,
  fullHeight = false,
  ...props
}: ContainerProps): ReactElement {
  const containerClassName = cn(
    containerClassNames({ padding, fullWidth, fullHeight, narrow, ...props }),
  )
  const Tag = tag

  return (
    <Tag data-testid={dataTestId} className={containerClassName} {...props} />
  )
}
