'use client'

import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Body } from '@/components/atoms/typography/body/body'
import { useListingDetailContext } from '@/features/listings/listing-detail/providers/listing-detail-context-provider'

export function ListingDetailSubtitle(): ReactElement {
  const {
    listing: { structure, location, floorPlan, guestsAmount },
  } = useListingDetailContext()
  const tListing = useTranslations('listing')
  const tCommon = useTranslations('common')

  return (
    <FlexBox tag="section" flex-direction="col" gap={2}>
      <Body color="secondary" size="base-md" text-align="center">
        {tListing('description.heading', {
          structure: tListing(`structure.${structure}`),
          city: location?.city ?? '',
        })}
      </Body>
    </FlexBox>
  )
}
