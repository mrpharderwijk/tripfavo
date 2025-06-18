'use client'

import Image from 'next/image'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { Body } from '@/components/atoms/typography/body/body'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { useGuestReservationDetailContext } from '@/features/guest/reservations/guest-reservation-detail/providers/guest-reservation-detail-context-provider'

export function GuestReservationDetailListing(): ReactElement {
  const { reservation } = useGuestReservationDetailContext()
  const mainImage = reservation?.listing?.images[0] ?? { url: '' }

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
          alt={mainImage.url}
          width={105}
          height={105}
        />
      </FlexBoxItem>

      <FlexBoxItem flex="auto" display="flex" flex-direction="col" gap={2}>
        <Heading tag="h2" like="h5-semibold">
          {reservation?.listing?.title}
        </Heading>
        <Body size="base-md" color="secondary">
          {reservation?.listing?.location?.city},{' '}
          {reservation?.listing?.location?.country}
        </Body>
      </FlexBoxItem>
    </FlexBox>
  )
}
