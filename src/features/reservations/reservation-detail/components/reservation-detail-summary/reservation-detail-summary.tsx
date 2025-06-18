import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { Divider } from '@/components/atoms/layout/divider/divider'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { ReservationDetailSummaryDates } from '@/features/reservations/reservation-detail/components/reservation-detail-summary/reservation-detail-summary-dates'
import { ReservationDetailSummaryGuests } from '@/features/reservations/reservation-detail/components/reservation-detail-summary/reservation-detail-summary-guests'

export function ReservationDetailSummary(): ReactElement {
  const tReservationDetailSummary = useTranslations('reservationDetail.summary')

  return (
    <FlexBox flex-direction="col">
      <Heading tag="h3" like="h3-semibold">
        {tReservationDetailSummary('heading')}
      </Heading>

      <FlexBox flex-direction="col">
        <ReservationDetailSummaryDates />
        <Divider bg-color="deco" />
        <ReservationDetailSummaryGuests />
      </FlexBox>
    </FlexBox>
  )
}
