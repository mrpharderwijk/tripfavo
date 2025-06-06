import { useTranslations } from 'next-intl'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { ReservationDetailSummaryDates } from '@/features/reservations/reservation-detail/components/reservation-detail-summary/reservation-detail-summary-dates'
import { ReservationDetailSummaryGuests } from '@/features/reservations/reservation-detail/components/reservation-detail-summary/reservation-detail-summary-guests'

export function ReservationDetailSummary() {
  const tReservationDetailSummary = useTranslations('reservationDetail.summary')

  return (
    <FlexBox flex-direction="col" gap={6}>
      <Heading tag="h3" like="h3-semibold">
        {tReservationDetailSummary('heading')}
      </Heading>

      <FlexBox flex-direction="col">
        <ReservationDetailSummaryDates />
        <ReservationDetailSummaryGuests />
      </FlexBox>
    </FlexBox>
  )
}
