import { VariantProps } from 'class-variance-authority'
import { ReactElement, ReactNode } from 'react'

import { Body } from '@/components/atoms/typography/body/body'
import { textClassNames } from '@/components/atoms/typography/text/text.class-names'

type HeadingGroupProps = {
  title?: ReactNode
  subtitle?: ReactNode
  size?: 'sm' | 'md' | 'lg'
}

const titleSizeMap: Record<
  'sm' | 'md' | 'lg',
  VariantProps<typeof textClassNames>['font-size']
> = {
  sm: 'titles-sm-semibold',
  md: 'titles-md-semibold',
  lg: 'titles-lg-semibold',
}
const subtitleSizeMap: Record<
  'sm' | 'md' | 'lg',
  VariantProps<typeof textClassNames>['font-size']
> = {
  sm: 'base-xs',
  md: 'base-sm',
  lg: 'base-md',
}

export function HeadingGroup({
  title,
  subtitle,
  size = 'lg',
}: HeadingGroupProps): ReactElement {
  return (
    <div className="flex flex-col gap-2">
      <Body size={titleSizeMap[size] ?? 'titles-lg-semibold'} weight="black">
        {title}
      </Body>
      <Body
        size={subtitleSizeMap[size] ?? 'base-md'}
        weight="medium"
        color="secondary"
      >
        {subtitle}
      </Body>
    </div>
  )
}
