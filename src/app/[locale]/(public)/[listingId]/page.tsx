import { notFound } from 'next/navigation'
import { ReactElement } from 'react'

import { getPublishedListing } from '@/features/listings/actions/get-listings'
import { ListingDetailPage } from '@/features/listings/listing-detail/listing-detail.page'

type ListingPageProps = {
  params: Promise<{ listingId: string }>
}

export default async function ListingPage({ params }: ListingPageProps): Promise<ReactElement> {
  const { listingId } = await params
  const listing = await getPublishedListing(listingId)

  if (!listing) {
    notFound()
  }

  return <ListingDetailPage listing={listing} />
}
