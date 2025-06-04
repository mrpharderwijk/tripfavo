import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Body } from '@/components/atoms/typography/body/body'
import { Heading } from '@/components/atoms/typography/heading/heading'

type ListingDetailAboutProps = { heading?: string; description?: string | null }

export function ListingDetailAbout({
  heading,
  description,
}: ListingDetailAboutProps): ReactElement | null {
  if (!heading && !description) {
    return null
  }

  return (
    <FlexBox flex-direction="col" gap={6}>
      <Heading tag="h3" like="h3-semibold">
        {heading}
      </Heading>

      <Body color="secondary" size="base-lgt">
        {description}
      </Body>
    </FlexBox>
  )
}
