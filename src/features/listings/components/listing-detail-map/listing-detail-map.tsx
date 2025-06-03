'use client'

import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
import { ReactElement, useMemo } from 'react'

import { Box } from '@/components/atoms/layout/box/box'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Body } from '@/components/atoms/typography/body/body'
import { Heading } from '@/components/atoms/typography/heading/heading'

type ListingDetailMapProps = {
  latitude?: number
  longitude?: number
}

export function ListingDetailMap({
  latitude,
  longitude,
}: ListingDetailMapProps): ReactElement | null {
  const tListingLocation = useTranslations('listing.location')
  const Map = useMemo(
    () =>
      dynamic(() => import('@/components/atoms/map/map').then((mod) => mod.Map), { ssr: false }),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [latitude, longitude],
  )

  return !isNaN(latitude ?? 0) && !isNaN(longitude ?? 0) ? (
    <FlexBox
      flex-direction="col"
      align-items="start"
      justify-content="start"
      border-t={1}
      border-b={1}
      border-color="tertiary"
      padding-y={10}
      fullWidth
      fullHeight
      gap={6}
    >
      <Heading tag="h3" like="h3-semibold">
        {tListingLocation('label')}
      </Heading>

      <Box position="relative" fullWidth>
        <button className="w-full h-[35vh]" type="button" onClick={() => console.log('clicked')}>
          <Map center={[latitude ?? 0, longitude ?? 0]} zoom={15} />
        </button>
      </Box>

      <FlexBox flex-direction="col" gap={2}>
        <Heading tag="h4" like="h4-semibold">
          {tListingLocation('about')}
        </Heading>

        {/* TODO: Add the neighborhood description */}
        <Body color="secondary" size="base-lgt">
          The appartment is located in the heart of Roquebrune Cap Martin. It is a 5-minute drive
          from the beach of Menton and a 10-minute drive from the city of Monaco. <br />
          <br />
          In the neighborhood, you can find a{' '}
          <strong>
            pharmacy, boucher, bakery, small supermarket and a wonderful child-friendly park at
            walking distance
          </strong>
          .
          <br />
          <br />
          The rocky beach of Cap Martin can be accessed from the complex with a provided key. This
          opens up one of the most beautiful hikes along the coast with a view of Monaco and the
          french Riviera!
        </Body>
      </FlexBox>
    </FlexBox>
  ) : null
}
