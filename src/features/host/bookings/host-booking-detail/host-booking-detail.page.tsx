import { ReactElement } from 'react'

import { Divider } from '@/components/atoms/layout/divider/divider'
import { AppShellBody } from '@/components/molecules/layout/app-shell/app-shell-body'
import { SafeBooking } from '@/features/bookings/types/booking'
import { HostBookingDetailListing } from '@/features/host/bookings/host-booking-detail/components/host-booking-detail-listing/host-booking-detail-listing'
import { HostBookingDetailPriceBreakdown } from '@/features/host/bookings/host-booking-detail/components/host-booking-detail-price-breakdown/host-booking-detail-price-breakdown'
import { HostBookingDetailSummary } from '@/features/host/bookings/host-booking-detail/components/host-booking-detail-summary/host-booking-detail-summary'
import { HostBookingDetailContextProvider } from '@/features/host/bookings/host-booking-detail/providers/host-booking-detail-context-provider'

type BookingDetailPageProps = {
  booking: SafeBooking
}

export default async function HostBookingDetailPage({
  booking,
}: BookingDetailPageProps): Promise<ReactElement> {
  return (
    <AppShellBody>
      <HostBookingDetailContextProvider booking={booking}>
        <HostBookingDetailListing />
        <Divider />

        <HostBookingDetailSummary />
        <Divider />

        <HostBookingDetailPriceBreakdown />
      </HostBookingDetailContextProvider>
    </AppShellBody>
  )
}
