'use client'

import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Body } from '@/components/atoms/typography/body/body'
import { usePropertyDetailContext } from '@/features/properties/property-detail/providers/property-detail-context-provider'

export function PropertyDetailSubtitle(): ReactElement {
  const {
    property: { structure, location, floorPlan, guestsAmount },
  } = usePropertyDetailContext()
  const tProperty = useTranslations('property')
  const tCommon = useTranslations('common')

  return (
    <FlexBox tag="section" flex-direction="col" gap={2}>
      <Body color="secondary" size="base-md" text-align="center">
        {tProperty('description.heading', {
          structure: tProperty(`structure.${structure}`),
          city: location?.city ?? '',
        })}
      </Body>
    </FlexBox>
  )
}
