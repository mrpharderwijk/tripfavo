import { notFound } from 'next/navigation'
import { ReactElement } from 'react'

import { AppShell } from '@/components/molecules/layout/app-shell/app-shell'
import { GuestBookingDetailPage } from '@/features/guest/bookings/guest-booking-detail/guest-booking-detail.page'
import { getGuestBookingDetail } from '@/features/guest/bookings/server/actions/get-guest-bookings'
import { BackButton } from '@/features/nav-bar/components/back-button/back-button'
import { NavBar } from '@/features/nav-bar/nav-bar'
import { isActionError } from '@/server/utils/error'
import { WithParams } from '@/types/with-params'

type BookingDetailNextPageProps = WithParams

export default async function BookingDetailNextPage({
  params,
}: BookingDetailNextPageProps): Promise<ReactElement> {
  const { bookingId } = await params
  const publishedBookingResponse = await getGuestBookingDetail(
    bookingId as string,
  )
  const publishedBooking = isActionError(publishedBookingResponse)
    ? null
    : publishedBookingResponse?.data

  if (!publishedBooking) {
    notFound()
  }

  return (
    <AppShell
      navbar={
        <NavBar fixed={false}>
          <BackButton routePath={`/guest/bookings`} />
        </NavBar>
      }
    >
      <GuestBookingDetailPage booking={publishedBooking ?? null} />
    </AppShell>
  )
}
