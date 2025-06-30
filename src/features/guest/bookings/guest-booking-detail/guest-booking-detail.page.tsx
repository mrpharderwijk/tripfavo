'use client'

import { ReactElement } from 'react'

import { Divider } from '@/components/atoms/layout/divider/divider'
import { AppShellBody } from '@/components/molecules/layout/app-shell/app-shell-body'
import { SafeBooking } from '@/features/bookings/types/booking'
import { GuestBookingDetailListing } from '@/features/guest/bookings/guest-booking-detail/components/guest-booking-detail-listing/guest-booking-detail-listing'
import { GuestBookingDetailPriceBreakdown } from '@/features/guest/bookings/guest-booking-detail/components/guest-booking-detail-price-breakdown/guest-booking-detail-price-breakdown'
import { GuestBookingDetailSummary } from '@/features/guest/bookings/guest-booking-detail/components/guest-booking-detail-summary/guest-booking-detail-summary'
import { GuestBookingDetailContextProvider } from '@/features/guest/bookings/guest-booking-detail/providers/guest-booking-detail-context-provider'

type GuestBookingDetailPageProps = {
  booking: SafeBooking | null
}

export function GuestBookingDetailPage({
  booking,
}: GuestBookingDetailPageProps): ReactElement {
  return (
    <AppShellBody>
      <GuestBookingDetailContextProvider booking={booking}>
        <GuestBookingDetailListing />
        <Divider />

        <GuestBookingDetailSummary />
        <Divider />

        <GuestBookingDetailPriceBreakdown />
      </GuestBookingDetailContextProvider>
    </AppShellBody>
  )
}
