import { notFound } from 'next/navigation'
import { ReactElement } from 'react'

import { getPublishedListing } from '@/features/listings/server/actions/get-listings'
import { ReservationDetailPage } from '@/features/reservations/reservation-detail/reservation-detail.page'
import { isActionError } from '@/server/utils/error'

type ReservationPageProps = {
  params: Promise<{ listingId: string }>
  searchParams: Promise<{ startDate?: string; endDate?: string }>
}

export default async function ReservationPage({
  params,
  searchParams,
}: ReservationPageProps): Promise<ReactElement> {
  const { listingId } = await params
  const listingResponse = await getPublishedListing(listingId)
  const listing = isActionError(listingResponse)
    ? null
    : (listingResponse?.data ?? null)

  if (!listing) {
    notFound()
  }

  return <ReservationDetailPage listing={listing} />
}
