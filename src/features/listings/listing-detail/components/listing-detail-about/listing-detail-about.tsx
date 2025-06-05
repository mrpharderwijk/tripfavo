'use client'

import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Body } from '@/components/atoms/typography/body/body'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { useListingDetailContext } from '@/features/listings/listing-detail/providers/listing-detail-context-provider'

export function ListingDetailAbout(): ReactElement | null {
  const {
    listing: { description },
  } = useListingDetailContext()
  const tListing = useTranslations('listing')

  if (!description) {
    return null
  }

  return (
    <FlexBox tag="section" flex-direction="col" gap={6}>
      <Heading tag="h3" like="h3-semibold">
        {tListing('about.heading')}
      </Heading>

      <Body color="secondary" size="base-lgt">
        {description}
      </Body>
    </FlexBox>
  )
}
