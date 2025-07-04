'use client'

import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
import { ReactElement, useMemo } from 'react'

import { Box } from '@/components/atoms/layout/box/box'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Body } from '@/components/atoms/typography/body/body'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { usePropertyDetailContext } from '@/features/properties/property-detail/providers/property-detail-context-provider'

export function PropertyDetailLocation(): ReactElement | null {
  const {
    property: { location, neighbourhoodDescription },
  } = usePropertyDetailContext()
  const tPropertyLocation = useTranslations('property.location')
  const Map = useMemo(
    () =>
      dynamic(
        () => import('@/components/atoms/map/map').then((mod) => mod.Map),
        { ssr: false },
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location?.latitude, location?.longitude],
  )

  if (!location) {
    return null
  }

  const { latitude, longitude } = location

  return !isNaN(latitude ?? 0) && !isNaN(longitude ?? 0) ? (
    <FlexBox
      tag="section"
      flex-direction="col"
      align-items="start"
      justify-content="start"
      border-color="tertiary"
      fullWidth
      fullHeight
      gap={6}
    >
      {tPropertyLocation('heading') && (
        <Heading tag="h2" like="h3-semibold">
          {tPropertyLocation('heading')}
        </Heading>
      )}

      <Box position="relative" fullWidth>
        <button
          className="w-full h-[35vh]"
          type="button"
          onClick={() => console.log('clicked')}
        >
          <Map center={[latitude ?? 0, longitude ?? 0]} zoom={15} />
        </button>
      </Box>

      <FlexBox flex-direction="col" gap={2}>
        <Heading tag="h4" like="h4-semibold">
          {tPropertyLocation('about')}
        </Heading>

        {neighbourhoodDescription && (
          <Body color="secondary" size="base-lgt">
            {neighbourhoodDescription}
          </Body>
        )}
      </FlexBox>
    </FlexBox>
  ) : null
}
