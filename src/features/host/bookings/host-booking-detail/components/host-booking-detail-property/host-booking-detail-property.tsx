'use client'

import Image from 'next/image'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { Body } from '@/components/atoms/typography/body/body'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { useHostBookingDetailContext } from '@/features/host/bookings/host-booking-detail/providers/host-booking-detail-context-provider'

export function HostBookingDetailProperty(): ReactElement {
  const { booking } = useHostBookingDetailContext()
  const mainImage =
    booking?.property.images.find((image) => image.isMain) ??
    booking?.property.images[0]

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
          src={mainImage?.url ?? ''}
          alt={mainImage?.fileName ?? ''}
          width={105}
          height={105}
        />
      </FlexBoxItem>

      <FlexBoxItem flex="auto" display="flex" flex-direction="col" gap={2}>
        <Heading tag="h2" like="h5-semibold">
          {booking?.property?.title}
        </Heading>
        <Body size="base-md" color="secondary">
          {booking?.property?.location?.city},{' '}
          {booking?.property?.location?.country}
        </Body>
      </FlexBoxItem>
    </FlexBox>
  )
}
