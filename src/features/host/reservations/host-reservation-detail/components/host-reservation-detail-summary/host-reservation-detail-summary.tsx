import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { Divider } from '@/components/atoms/layout/divider/divider'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { HostReservationDetailSummaryDates } from '@/features/host/reservations/host-reservation-detail/components/host-reservation-detail-summary/host-reservation-detail-summary-dates'
import { HostReservationDetailSummaryGuests } from '@/features/host/reservations/host-reservation-detail/components/host-reservation-detail-summary/host-reservation-detail-summary-guests'

export function HostReservationDetailSummary(): ReactElement {
  const tReservationDetailSummary = useTranslations('reservationDetail.summary')

  return (
    <FlexBox flex-direction="col">
      <Heading tag="h3" like="h3-semibold">
        {tReservationDetailSummary('heading')}
      </Heading>

      <FlexBox flex-direction="col">
        <HostReservationDetailSummaryDates />
        <Divider />
        <HostReservationDetailSummaryGuests />
      </FlexBox>
    </FlexBox>
  )
}
