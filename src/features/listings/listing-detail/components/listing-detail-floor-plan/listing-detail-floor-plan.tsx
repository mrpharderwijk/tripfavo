'use client'

import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { Body } from '@/components/atoms/typography/body/body'
import { DotList } from '@/components/organisms/dot-list/dot-list'
import { DotListItem } from '@/components/organisms/dot-list/dot-list-item'
import { useListingDetailContext } from '@/features/listings/listing-detail/providers/listing-detail-context-provider'

export function ListingDetailFloorPlan(): ReactElement {
  const {
    listing: { floorPlan, guestsAmount },
  } = useListingDetailContext()
  const tListing = useTranslations('listing')
  const tCommon = useTranslations('common')

  return (
    <FlexBox tag="section" flex-direction="col" gap={2}>
      {guestsAmount?.maxGuests && (
        <Body color="secondary" size="base-lgt" text-align="center">
          {tListing('guestsAmount.maxGuests', { amount: guestsAmount?.maxGuests })}
        </Body>
      )}

      <FlexBoxItem display="flex" align-items="center" justify-content="center">
        <DotList>
          {floorPlan?.bedrooms && (
            <DotListItem>
              {tCommon('bedroomAmount', { amount: floorPlan?.bedrooms ?? 0 })}
            </DotListItem>
          )}
          {floorPlan?.bathrooms && (
            <DotListItem>
              {tCommon('bathroomAmount', { amount: floorPlan?.bathrooms ?? 0 })}
            </DotListItem>
          )}
          {floorPlan?.kitchens && (
            <DotListItem>
              {tCommon('kitchenAmount', { amount: floorPlan?.kitchens ?? 0 })}
            </DotListItem>
          )}
          {floorPlan?.livingRooms && (
            <DotListItem last>
              {tCommon('livingRoomAmount', { amount: floorPlan?.livingRooms ?? 0 })}
            </DotListItem>
          )}
        </DotList>
      </FlexBoxItem>
    </FlexBox>
  )
}
