'use client'

import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { Heading } from '@/components/atoms/typography/heading/heading'

type PropertyHeaderProps = {
  title: string
}

export function PropertyHeader({ title }: PropertyHeaderProps): ReactElement {
  return (
    <FlexBox tag="header" flex-direction="col" gap={2}>
      <FlexBoxItem>
        <Heading tag="h1" like="h2-semibold">
          {title}
        </Heading>
      </FlexBoxItem>
    </FlexBox>
  )
}
