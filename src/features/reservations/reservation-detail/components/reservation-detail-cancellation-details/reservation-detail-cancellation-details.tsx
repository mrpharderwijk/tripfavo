'use client'

import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Heading } from '@/components/atoms/typography/heading/heading'

export function ReservationDetailCancellationDetails(): ReactElement {
  const tReservationDetailCancellationDetails = useTranslations(
    'reservationDetail.cancellationDetails',
  )
  return (
    <FlexBox flex-direction="col" padding-b={6} gap={6}>
      <Heading tag="h3" like="h3-semibold">
        {tReservationDetailCancellationDetails('heading')}
      </Heading>
    </FlexBox>
  )
}
