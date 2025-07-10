'use client'

import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Body } from '@/components/atoms/typography/body/body'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { usePropertyDetailContext } from '@/features/properties/property-detail/providers/property-detail-context-provider'

export function PropertyDetailAbout(): ReactElement | null {
  const {
    property: { description },
  } = usePropertyDetailContext()
  const tProperty = useTranslations('property')

  if (!description) {
    return null
  }

  return (
    <FlexBox tag="section" flex-direction="col" gap={6}>
      <Heading tag="h3" like="h3-semibold">
        {tProperty('about.heading')}
      </Heading>

      <Body color="secondary" size="base-lgt">
        {description}
      </Body>
    </FlexBox>
  )
}
