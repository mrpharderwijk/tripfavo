'use client'

import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { Body } from '@/components/atoms/typography/body/body'
import { DotList } from '@/components/organisms/dot-list/dot-list'
import { DotListItem } from '@/components/organisms/dot-list/dot-list-item'
import { useListingDetailContext } from '@/features/listings/listing-detail/providers/listing-detail-context-provider'

export function ListingDetailSubtitle(): ReactElement {
  const {
    listing: { structure, location, floorPlan },
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

      <FlexBoxItem display="flex" align-items="center" justify-content="center">
        <DotList>
          <DotListItem>{tCommon('guestCount', { amount: floorPlan?.guestCount ?? 0 })}</DotListItem>
          <DotListItem>{tCommon('roomCount', { amount: floorPlan?.roomCount ?? 0 })}</DotListItem>
          <DotListItem>
            {tCommon('bedroomCount', { amount: floorPlan?.bedroomCount ?? 0 })}
          </DotListItem>
          <DotListItem>{tCommon('bedCount', { amount: floorPlan?.bedCount ?? 0 })}</DotListItem>
          <DotListItem last>
            {tCommon('bathroomCount', { amount: floorPlan?.bathroomCount ?? 0 })}
          </DotListItem>
        </DotList>
      </FlexBoxItem>
    </FlexBox>
  )
}
