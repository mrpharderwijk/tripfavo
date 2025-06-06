import { notFound } from 'next/navigation'
import { ReactElement } from 'react'

import { getPublishedListing } from '@/features/listings/actions/get-listings'
import { ReservationDetailPage } from '@/features/reservations/reservation-detail/reservation-detail.page'

type ReservationPageProps = {
  params: Promise<{ listingId: string }>
  searchParams: Promise<{ startDate?: string; endDate?: string }>
}

export default async function ReservationPage({
  params,
  searchParams,
}: ReservationPageProps): Promise<ReactElement> {
  const { listingId } = await params
  const listing = await getPublishedListing(listingId)

  if (!listing) {
    notFound()
  }

  return <ReservationDetailPage listing={listing} />
}
