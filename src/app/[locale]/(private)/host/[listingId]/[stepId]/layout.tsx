import { redirect } from 'next/navigation'
import { PropsWithChildren, ReactElement } from 'react'

import { HostContextProvider } from '@/features/host/providers/host-context-provider'
import { getHostListing } from '@/features/host/server/actions/get-host-listings'
import { isActionError } from '@/server/utils/error'

type HostListingStepLayoutProps = PropsWithChildren<{
  params: Promise<{ locale: string; listingId: string; stepId: string }>
}>

export default async function HostListingStepLayout({
  children,
  params,
}: HostListingStepLayoutProps): Promise<ReactElement> {
  const { listingId, stepId } = await params
  const listingResponse = await getHostListing(listingId)
  const listing = isActionError(listingResponse)
    ? null
    : (listingResponse?.data ?? null)

  if (!listing) {
    redirect(`/host/overview`)
  }

  return (
    <HostContextProvider currentStep={stepId} listingId={listingId}>
      {children}
    </HostContextProvider>
  )
}
