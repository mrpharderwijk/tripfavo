import { redirect } from 'next/navigation'
import { ReactElement } from 'react'

import { getHostListing } from '@/features/host/server/actions/get-host-listings'
import { isActionError } from '@/server/utils/error'

export default async function HostListingPage({
  params,
}: {
  params: Promise<{ listingId: string }>
}): Promise<ReactElement> {
  const { listingId } = await params
  const listingResponse = await getHostListing(listingId)
  const listing = isActionError(listingResponse) ? null : listingResponse?.data

  if (listing) {
    redirect(`/host/${listingId}/structure`)
  } else {
    redirect(`/host/overview`)
  }
}
