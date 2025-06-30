import Image from 'next/image'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { Body } from '@/components/atoms/typography/body/body'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { useBookingDetailContext } from '@/features/bookings/booking-detail/providers/booking-detail-context-provider'

export function BookingDetailListing(): ReactElement {
  const { listing } = useBookingDetailContext()
  const mainImage =
    listing.images.find((image) => image.isMain) ?? listing.images[0]

  return (
    <FlexBox
      flex-direction="row"
      align-items="center"
      justify-content="start"
      gap={4}
    >
      <FlexBoxItem flex="initial">
        <Image
          className="rounded-lg aspect-square object-cover"
          src={mainImage.url}
          alt={mainImage.url ?? ''}
          width={105}
          height={105}
        />
      </FlexBoxItem>

      <FlexBoxItem flex="auto" display="flex" flex-direction="col" gap={2}>
        <Heading tag="h2" like="h5-semibold">
          {listing.title}
        </Heading>
        <Body size="base-md" color="secondary">
          {listing?.location?.city}, {listing?.location?.country}
        </Body>
      </FlexBoxItem>
    </FlexBox>
  )
}
