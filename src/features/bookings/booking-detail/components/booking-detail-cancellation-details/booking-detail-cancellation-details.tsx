'use client'

import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Heading } from '@/components/atoms/typography/heading/heading'

export function BookingDetailCancellationDetails(): ReactElement {
  const tBookingDetailCancellationDetails = useTranslations(
    'bookingDetail.cancellationDetails',
  )
  return (
    <FlexBox flex-direction="col" padding-b={6} gap={6}>
      <Heading tag="h3" like="h3-semibold">
        {tBookingDetailCancellationDetails('heading')}
      </Heading>
    </FlexBox>
  )
}
