import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { Divider } from '@/components/atoms/layout/divider/divider'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { HostBookingDetailSummaryDates } from '@/features/host/bookings/host-booking-detail/components/host-booking-detail-summary/host-booking-detail-summary-dates'
import { HostBookingDetailSummaryGuests } from '@/features/host/bookings/host-booking-detail/components/host-booking-detail-summary/host-booking-detail-summary-guests'

export function HostBookingDetailSummary(): ReactElement {
  const tBookingDetailSummary = useTranslations('bookingDetail.summary')

  return (
    <FlexBox flex-direction="col">
      <Heading tag="h3" like="h3-semibold">
        {tBookingDetailSummary('heading')}
      </Heading>

      <FlexBox flex-direction="col">
        <HostBookingDetailSummaryDates />
        <Divider />
        <HostBookingDetailSummaryGuests />
      </FlexBox>
    </FlexBox>
  )
}
