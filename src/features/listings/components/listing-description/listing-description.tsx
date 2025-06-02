'use client'

import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { DotList } from '@/components/organisms/dot-list/dot-list'
import { DotListItem } from '@/components/organisms/dot-list/dot-list-item'
import { PublicListing } from '@/features/listings/types/public-listing'

type ListingDescriptionProps = {
  structure: PublicListing['structure']
  city: NonNullable<PublicListing['location']>['city']
  floorPlan: PublicListing['floorPlan']
}

export function ListingDescription({
  city,
  floorPlan,
  structure,
}: ListingDescriptionProps): ReactElement {
  const tListing = useTranslations('listing')
  const tCommon = useTranslations('common')
  return (
    <FlexBox
      bg-color="primary"
      flex-direction="col"
      gap={2}
      border-radius-tl="3xl"
      border-radius-tr="3xl"
      padding={6}
      background-color="white"
      margin-top-negative={12}
    >
      <FlexBoxItem>
        <Heading tag="h2" like="h6" text-align="center">
          {tListing('description.title', { structure: tListing(`structure.${structure}`), city })}
        </Heading>
      </FlexBoxItem>
      <FlexBoxItem>
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
