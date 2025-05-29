import { redirect } from 'next/navigation'
import { ReactElement } from 'react'

import { getHostListing } from '@/features/host/actions/get-host-listings'

export default async function HostListingPage({
  params,
}: {
  params: Promise<{ listingId: string }>
}): Promise<ReactElement> {
  const { listingId } = await params
  const listing = await getHostListing(listingId)

  if (listing) {
    redirect(`/host/${listingId}/structure`)
  } else {
    redirect(`/host/overview`)
  }
}
