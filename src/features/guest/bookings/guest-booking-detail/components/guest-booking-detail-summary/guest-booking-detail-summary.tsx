import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { Divider } from '@/components/atoms/layout/divider/divider'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { GuestBookingDetailSummaryDates } from '@/features/guest/bookings/guest-booking-detail/components/guest-booking-detail-summary/guest-booking-detail-summary-dates'
import { GuestBookingDetailSummaryGuests } from '@/features/guest/bookings/guest-booking-detail/components/guest-booking-detail-summary/guest-booking-detail-summary-guests'

export function GuestBookingDetailSummary(): ReactElement {
  const tBookingDetailSummary = useTranslations('bookingDetail.summary')

  return (
    <FlexBox flex-direction="col">
      <Heading tag="h3" like="h3-semibold">
        {tBookingDetailSummary('heading')}
      </Heading>

      <FlexBox flex-direction="col">
        <GuestBookingDetailSummaryDates />
        <Divider />
        <GuestBookingDetailSummaryGuests />
      </FlexBox>
    </FlexBox>
  )
}
