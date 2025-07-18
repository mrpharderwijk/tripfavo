'use client'

import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { DotList } from '@/components/organisms/dot-list/dot-list'
import { DotListItem } from '@/components/organisms/dot-list/dot-list-item'
import { PublicProperty } from '@/features/properties/types/public-property'

type PropertyDescriptionProps = {
  structure: PublicProperty['structure']
  city: NonNullable<PublicProperty['location']>['city']
  floorPlan: PublicProperty['floorPlan']
}

export function PropertyDescription({
  city,
  floorPlan,
  structure,
}: PropertyDescriptionProps): ReactElement {
  const tProperty = useTranslations('property')
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
          {tProperty('description.title', {
            structure: tProperty(`structure.${structure}`),
            city,
          })}
        </Heading>
      </FlexBoxItem>
      <FlexBoxItem>
        <DotList>
          <DotListItem>
            {tCommon('roomAmount', { amount: floorPlan?.rooms ?? 0 })}
          </DotListItem>
          <DotListItem>
            {tCommon('bedroomAmount', { amount: floorPlan?.bedrooms ?? 0 })}
          </DotListItem>
          <DotListItem>
            {tCommon('bedAmount', { amount: floorPlan?.beds ?? 0 })}
          </DotListItem>
          <DotListItem>
            {tCommon('kitchenAmount', { amount: floorPlan?.kitchens ?? 0 })}
          </DotListItem>
          <DotListItem>
            {tCommon('livingRoomAmount', {
              amount: floorPlan?.livingRooms ?? 0,
            })}
          </DotListItem>
          <DotListItem last>
            {tCommon('bathroomAmount', { amount: floorPlan?.bathrooms ?? 0 })}
          </DotListItem>
        </DotList>
      </FlexBoxItem>
    </FlexBox>
  )
}
