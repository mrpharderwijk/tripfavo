import { redirect } from 'next/navigation'
import { ReactElement } from 'react'

import { getListingByLoggedInUser } from '@/actions/get-listing-by-logged-in-user'

export default async function HostListingPage({
  params,
}: {
  params: Promise<{ listingId: string }>
}): Promise<ReactElement> {
  const { listingId } = await params
  const listing = await getListingByLoggedInUser(listingId)

  if (listing) {
    redirect(`/host/${listingId}/structure`)
  } else {
    redirect(`/host/overview`)
  }
}
