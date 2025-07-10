import { notFound } from 'next/navigation'
import { ReactElement } from 'react'

import HostBookingDetailPage from '@/features/host/bookings/host-booking-detail/host-booking-detail.page'
import { getHostBooking } from '@/features/host/bookings/server/actions/get-host-bookings'
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

  return <HostBookingDetailPage booking={hostBooking ?? null} />
}
