import { notFound } from 'next/navigation'
import { ReactElement } from 'react'

import { AppShell } from '@/components/molecules/layout/app-shell/app-shell'
import HostBookingDetailPage from '@/features/host/bookings/host-booking-detail/host-booking-detail.page'
import { getHostBooking } from '@/features/host/server/actions/get-host-bookings'
import { BackButton } from '@/features/nav-bar/components/back-button/back-button'
import { NavBar } from '@/features/nav-bar/nav-bar'
import { isActionError } from '@/server/utils/error'
import { WithParams } from '@/types/with-params'

type HostBookingDetailNextPageProps = WithParams

export default async function HostBookingDetailNextPage({
  params,
}: HostBookingDetailNextPageProps): Promise<ReactElement> {
  const { bookingId } = await params
  const hostBookingResponse = await getHostBooking(bookingId as string)
  const hostBooking = isActionError(hostBookingResponse)
    ? null
    : hostBookingResponse?.data

  if (!hostBooking) {
    notFound()
  }

  return (
    <AppShell
      navbar={
        <NavBar narrow fixed={false}>
          <BackButton routePath={`/host/bookings`} />
        </NavBar>
      }
    >
      <HostBookingDetailPage booking={hostBooking ?? null} />
    </AppShell>
  )
}
