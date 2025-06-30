import { redirect } from 'next/navigation'
import { ReactElement } from 'react'
import { ListingStatus } from '@prisma/client'

import { HostListingDetailPage } from '@/features/host/listings/host-listing-detail/host-listing-detail.page'
import { getHostListing } from '@/features/host/listings/server/actions/get-host-listings'
import { isActionError } from '@/server/utils/error'

export default async function HostListingNextPage({
  params,
}: {
  params: Promise<{ listingId: string }>
}): Promise<ReactElement> {
  const { listingId } = await params
  const listingResponse = await getHostListing(listingId)
  const listing = isActionError(listingResponse)
    ? null
    : (listingResponse?.data ?? null)

  if (listing && listing.status !== ListingStatus.PUBLISHED) {
    redirect(`/host/${listingId}/structure`)
  }

  if (!listing) {
    redirect(`/host/listings`)
  }

  return <HostListingDetailPage />
}
