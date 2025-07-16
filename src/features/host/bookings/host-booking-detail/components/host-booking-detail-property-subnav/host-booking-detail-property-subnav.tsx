'use client'

import Image from 'next/image'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { useHostBookingDetailContext } from '@/features/host/bookings/host-booking-detail/providers/host-booking-detail-context-provider'

export function HostBookingDetailPropertySubnav(): ReactElement {
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
      max-width="xs"
    >
      <FlexBoxItem flex="initial">
        <Image
          className="rounded-lg aspect-square object-cover"
          src={mainImage?.url ?? ''}
          alt={mainImage?.fileName ?? ''}
          width={50}
          height={50}
        />
      </FlexBoxItem>

      <FlexBoxItem flex="auto" display="flex" flex-direction="col" gap={2}>
        <Heading tag="h2" like="h6-semibold">
          {booking?.property?.title}
        </Heading>
      </FlexBoxItem>
    </FlexBox>
  )
}
