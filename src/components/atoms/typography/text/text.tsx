import { VariantProps } from 'class-variance-authority'
import { PropsWithChildren, ReactElement } from 'react'

import { textClassNames } from '@/components/atoms/typography/text/text.class-names'
import { PropsWithTestId, TextElementTag } from '@/types'

export type TextProps = PropsWithChildren<
  VariantProps<typeof textClassNames> &
    PropsWithTestId<{
      tag?: TextElementTag
    }>
>

export function Text({ tag = 'span', children, ...textProps }: TextProps): ReactElement {
  const Tag = tag
  const textClassName = textClassNames(textProps)

  return <Tag className={textClassName}>{children}</Tag>
}
