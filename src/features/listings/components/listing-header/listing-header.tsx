import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { Heading } from '@/components/atoms/typography/heading/heading'

type ListingHeaderProps = {
  title: string
}

export function ListingHeader({ title }: ListingHeaderProps): ReactElement {
  return (
    <FlexBox>
      <FlexBoxItem>
        <Heading tag="h1" like="h2-semibold">
          {title}
        </Heading>
      </FlexBoxItem>
    </FlexBox>
  )
}
