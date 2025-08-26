import { getTranslations } from 'next-intl/server'
import { ReactElement } from 'react'
import { BookingStatus } from '@prisma/client'

import { Divider } from '@/components/atoms/layout/divider/divider'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { AppShell } from '@/components/molecules/layout/app-shell/app-shell'
import { AppShellBody } from '@/components/molecules/layout/app-shell/app-shell-body'
import { SafeBooking } from '@/features/bookings/types/booking'
import { HostBookingDetailBookerInfo } from '@/features/host/bookings/host-booking-detail/components/host-booking-detail-booker-info/host-booking-detail-booker-info'
import { HostBookingDetailBottomBar } from '@/features/host/bookings/host-booking-detail/components/host-booking-detail-bottom-bar/host-booking-detail-bottom-bar'
import { HostBookingDetailChatPane } from '@/features/host/bookings/host-booking-detail/components/host-booking-detail-chat-pane/host-booking-detail-chat-pane'
import { HostBookingDetailPriceBreakdown } from '@/features/host/bookings/host-booking-detail/components/host-booking-detail-price-breakdown/host-booking-detail-price-breakdown'
import { HostBookingDetailProperty } from '@/features/host/bookings/host-booking-detail/components/host-booking-detail-property/host-booking-detail-property'
import { HostBookingDetailPropertySubnav } from '@/features/host/bookings/host-booking-detail/components/host-booking-detail-property-subnav/host-booking-detail-property-subnav'
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

  return booking.status === BookingStatus.PENDING ? (
    <HostBookingDetailContextProvider booking={booking}>
      <AppShell
        navbar={
          <NavBar narrow position="relative">
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
          <HostBookingDetailProperty />
          <Divider />

          <HostBookingDetailBookerInfo />
          <Divider />

          <HostBookingDetailSummary />
          <Divider />

          <HostBookingDetailPriceBreakdown />
        </AppShellBody>
      </AppShell>
    </HostBookingDetailContextProvider>
  ) : (
    <HostBookingDetailContextProvider booking={booking}>
      <AppShell
        navbar={
          <NavBar
            narrow
            position="relative"
            subnav={<HostBookingDetailPropertySubnav />}
          >
            <FlexBox
              flex-direction="col"
              align-items="center"
              padding-y={4}
              gap={4}
              fullWidth
            >
              <FlexBoxItem
                flex-direction="row"
                fullWidth
                align-items="center"
                justify-content="between"
              >
                <BackButton routePath={`/host/bookings`} />
                <Heading tag="h1" like="h4-semibold">
                  {tHostBookingDetail('heading')}
                </Heading>
                <div />
              </FlexBoxItem>
            </FlexBox>
          </NavBar>
        }
      >
        <HostBookingDetailChatPane />
      </AppShell>
    </HostBookingDetailContextProvider>
  )
}
