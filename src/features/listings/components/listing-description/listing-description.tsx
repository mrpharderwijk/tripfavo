'use client'

import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { DotSeparator } from '@/components/atoms/dot-separator/dot-separator'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { Heading } from '@/components/atoms/typography/heading/heading'
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
    <FlexBox flex-direction="col" gap={2}>
      <FlexBoxItem>
        <Heading tag="h2" like="h3-semibold">
          {tListing('description.title', { structure: tListing(`structure.${structure}`), city })}
        </Heading>
      </FlexBoxItem>
      <FlexBoxItem>
        {tCommon('guestCount', { amount: floorPlan?.guestCount ?? 0 })} <DotSeparator />{' '}
        {tCommon('roomCount', { amount: floorPlan?.roomCount ?? 0 })} <DotSeparator />{' '}
        {tCommon('bedroomCount', { amount: floorPlan?.bedroomCount ?? 0 })} <DotSeparator />{' '}
        {tCommon('bedCount', { amount: floorPlan?.bedCount ?? 0 })}
      </FlexBoxItem>
    </FlexBox>
  )
}
