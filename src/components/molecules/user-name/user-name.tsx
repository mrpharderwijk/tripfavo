import { VariantProps } from 'class-variance-authority'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Body } from '@/components/atoms/typography/body/body'
import { SafeUser } from '@/types'

type UserNameProps = Pick<
  VariantProps<typeof Body>,
  'color' | 'font-weight' | 'size'
> & {
  name: SafeUser['name']
}

export function UserName({
  name,
  color = 'primary',
  size = 'base-md',
  'font-weight': fontWeight = 'medium',
}: UserNameProps): ReactElement {
  const { firstName, middleName, lastName } = name ?? {}

  return (
    <FlexBox flex-direction="row" flex-wrap="nowrap" gap={1}>
      {!!firstName && (
        <Body tag="span" color={color} font-weight={fontWeight} size={size}>
          {firstName}
        </Body>
      )}
      {!!middleName && (
        <Body tag="span" color={color} font-weight={fontWeight} size={size}>
          {middleName}
        </Body>
      )}
      {!!lastName && (
        <Body tag="span" color={color} font-weight={fontWeight} size={size}>
          {lastName}
        </Body>
      )}
    </FlexBox>
  )
}
