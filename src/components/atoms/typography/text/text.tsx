import { VariantProps } from 'class-variance-authority'
import { PropsWithChildren, ReactElement } from 'react'

import { textClassNames } from '@/components/atoms/typography/text/text.class-names'
import { PropsWithTestId, TextElementTag } from '@/types'
import { cn } from '@/utils/class-names'

export type TextProps = PropsWithChildren<
  VariantProps<typeof textClassNames> &
    PropsWithTestId<{
      tag?: TextElementTag
    }>
>

export function Text({ tag = 'span', children, ...textProps }: TextProps): ReactElement {
  const Tag = tag
  const textClassName = cn(textClassNames({ ...textProps }))

  return (
    <Tag className={textClassName} data-testid={textProps['text-color']}>
      {children}
    </Tag>
  )
}
