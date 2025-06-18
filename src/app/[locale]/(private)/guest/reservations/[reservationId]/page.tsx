import { notFound } from 'next/navigation'
import { ReactElement } from 'react'

import { GuestReservationDetailPage } from '@/features/guest/reservations/guest-reservation-detail/guest-reservation-detail.page'
import { getGuestReservationDetail } from '@/features/guest/server/actions/get-guest-reservations'
import { isActionError } from '@/server/utils/error'
import { WithParams } from '@/types/with-params'

type ReservationDetailNextPageProps = WithParams

export default async function ReservationDetailNextPage({
  params,
}: ReservationDetailNextPageProps): Promise<ReactElement> {
  const { reservationId } = await params
  const publishedReservationResponse = await getGuestReservationDetail(
    reservationId as string,
  )
  const publishedReservation = isActionError(publishedReservationResponse)
    ? null
    : publishedReservationResponse?.data

  if (!publishedReservation) {
    notFound()
  }

  return (
    <GuestReservationDetailPage reservation={publishedReservation ?? null} />
  )
}
