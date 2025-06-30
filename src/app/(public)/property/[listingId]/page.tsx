import { notFound } from 'next/navigation'
import { ReactElement } from 'react'

import { ListingDetailPage } from '@/features/listings/listing-detail/listing-detail.page'
import { getPublishedListing } from '@/features/listings/server/actions/get-listings'
import { isActionError } from '@/server/utils/error'

type ListingPageProps = {
  params: Promise<{ listingId: string }>
}

export default async function ListingPage({
  params,
}: ListingPageProps): Promise<ReactElement> {
  const { listingId } = await params
  const listingResponse = await getPublishedListing(listingId)
  const listing = isActionError(listingResponse)
    ? null
    : (listingResponse?.data ?? null)
  if (!listing) {
    notFound()
  }

  return <ListingDetailPage listing={listing} />
}
