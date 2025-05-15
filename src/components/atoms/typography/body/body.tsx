import { VariantProps } from 'class-variance-authority'
import { PropsWithChildren, ReactElement } from 'react'

import { bodyClassNames } from '@/components/atoms/typography/body/body.class-names'
import { Text } from '@/components/atoms/typography/text/text'
import { textClassNames } from '@/components/atoms/typography/text/text.class-names'
import { PropsWithTestId, TextElementTag } from '@/types'

type BodyProps = PropsWithChildren<
  PropsWithTestId<
    VariantProps<typeof bodyClassNames> & {
      size?: VariantProps<typeof textClassNames>['font-size']
      'size-sm'?: VariantProps<typeof textClassNames>['font-size-sm']
      'size-md'?: VariantProps<typeof textClassNames>['font-size-md']
      'size-lg'?: VariantProps<typeof textClassNames>['font-size-lg']
      'size-xl'?: VariantProps<typeof textClassNames>['font-size-xl']
      color?: VariantProps<typeof textClassNames>['text-color']
      weight?: VariantProps<typeof textClassNames>['font-weight']
      'weight-sm'?: VariantProps<typeof textClassNames>['font-weight-sm']
      'weight-md'?: VariantProps<typeof textClassNames>['font-weight-md']
      'weight-lg'?: VariantProps<typeof textClassNames>['font-weight-lg']
      'weight-xl'?: VariantProps<typeof textClassNames>['font-weight-xl']
      tag?: TextElementTag
    }
  >
>

export function Body({
  tag = 'p',
  children,
  size = 'base-lg',
  'size-sm': sizeSm,
  'size-md': sizeMd,
  'size-lg': sizeLg,
  'size-xl': sizeXl,
  color = 'black',
  'data-testid': testId,
  ...bodyProps
}: BodyProps): ReactElement {
  return (
    <Text
      tag={tag}
      font-size={size}
      font-size-sm={sizeSm}
      font-size-md={sizeMd}
      font-size-lg={sizeLg}
      font-size-xl={sizeXl}
      text-color={color}
      data-testid={testId}
      {...bodyProps}
    >
      {children}
    </Text>
  )
}
