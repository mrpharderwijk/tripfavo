import { getTranslations } from 'next-intl/server'
import { ReactElement } from 'react'

import { Divider } from '@/components/atoms/layout/divider/divider'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { AppShell } from '@/components/molecules/layout/app-shell/app-shell'
import { AppShellBody } from '@/components/molecules/layout/app-shell/app-shell-body'
import { SafeBooking } from '@/features/bookings/types/booking'
import { HostBookingDetailBookerInfo } from '@/features/host/bookings/host-booking-detail/components/host-booking-detail-booker-info/host-booking-detail-booker-info'
import { HostBookingDetailBottomBar } from '@/features/host/bookings/host-booking-detail/components/host-booking-detail-bottom-bar/host-booking-detail-bottom-bar'
import { HostBookingDetailListing } from '@/features/host/bookings/host-booking-detail/components/host-booking-detail-listing/host-booking-detail-listing'
import { HostBookingDetailPriceBreakdown } from '@/features/host/bookings/host-booking-detail/components/host-booking-detail-price-breakdown/host-booking-detail-price-breakdown'
import { HostBookingDetailSummary } from '@/features/host/bookings/host-booking-detail/components/host-booking-detail-summary/host-booking-detail-summary'
import { HostBookingDetailContextProvider } from '@/features/host/bookings/host-booking-detail/providers/host-booking-detail-context-provider'
import { BackButton } from '@/features/nav-bar/components/back-button/back-button'
import { NavBar } from '@/features/nav-bar/nav-bar'

type BookingDetailPageProps = {
  booking: SafeBooking
}

export default async function HostBookingDetailPage({
  booking,
}: BookingDetailPageProps): Promise<ReactElement> {
  const tHostBookingDetail = await getTranslations(
    'host.bookings.bookingDetail',
  )

  return (
    <HostBookingDetailContextProvider booking={booking}>
      <AppShell
        navbar={
          <NavBar narrow fixed={false}>
            <BackButton routePath={`/host/bookings`} />
            <Heading tag="h1" like="h4-semibold">
              {tHostBookingDetail('heading')}
            </Heading>
            <div />
          </NavBar>
        }
        bottomBar={<HostBookingDetailBottomBar />}
      >
        <AppShellBody>
          <HostBookingDetailListing />
          <Divider />

          <HostBookingDetailBookerInfo />
          <Divider />

          <HostBookingDetailSummary />
          <Divider />

          <HostBookingDetailPriceBreakdown />
        </AppShellBody>
      </AppShell>
    </HostBookingDetailContextProvider>
  )
}
