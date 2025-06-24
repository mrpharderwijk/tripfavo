import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { Divider } from '@/components/atoms/layout/divider/divider'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { BookingDetailSummaryDates } from '@/features/bookings/booking-detail/components/booking-detail-summary/booking-detail-summary-dates'
import { BookingDetailSummaryGuests } from '@/features/bookings/booking-detail/components/booking-detail-summary/booking-detail-summary-guests'

export function BookingDetailSummary(): ReactElement {
  const tBookingDetailSummary = useTranslations('reservationDetail.summary')

  return (
    <FlexBox flex-direction="col">
      <Heading tag="h3" like="h3-semibold">
        {tBookingDetailSummary('heading')}
      </Heading>

      <FlexBox flex-direction="col">
        <BookingDetailSummaryDates />
        <Divider bg-color="deco" />
        <BookingDetailSummaryGuests />
      </FlexBox>
    </FlexBox>
  )
}
