import { notFound } from 'next/navigation'
import { ReactElement } from 'react'

import { AppShell } from '@/components/molecules/layout/app-shell/app-shell'
import { getSession } from '@/features/auth/server/actions/get-current-user'
import { GuestBookingDetailPage } from '@/features/guest/bookings/guest-booking-detail/guest-booking-detail.page'
import { getGuestBookingDetail } from '@/features/guest/bookings/server/actions/get-guest-bookings'
import { BackButton } from '@/features/nav-bar/components/back-button/back-button'
import { NavBar } from '@/features/nav-bar/nav-bar'
import { isActionError } from '@/server/utils/error'
import { WithParams } from '@/types/with-params'

type BookingDetailNextPageProps = WithParams<{
  bookingId: string
}>

export default async function BookingDetailNextPage({
  params,
}: BookingDetailNextPageProps): Promise<ReactElement> {
  const { bookingId } = await params
  const session = await getSession()
  const publishedBookingResponse = await getGuestBookingDetail({
    userId: session?.user.id,
    bookingId: bookingId as string,
  })
  const publishedBooking = isActionError(publishedBookingResponse)
    ? null
    : publishedBookingResponse?.data

  if (!publishedBooking) {
    notFound()
  }

  return (
    <AppShell
      navbar={
        <NavBar position="relative">
          <BackButton routePath={`/guest/bookings`} />
        </NavBar>
      }
    >
      <GuestBookingDetailPage booking={publishedBooking ?? null} />
    </AppShell>
  )
}
