import { redirect } from 'next/navigation'
import { PropsWithChildren, ReactElement } from 'react'

import { HostContextProvider } from '@/features/host/providers/host-context-provider'
import { getHostListing } from '@/features/host/server/actions/get-host-listings'

type HostListingStepLayoutProps = PropsWithChildren<{
  params: Promise<{ locale: string; listingId: string; stepId: string }>
}>

export default async function HostListingStepLayout({
  children,
  params,
}: HostListingStepLayoutProps): Promise<ReactElement> {
  const { listingId, stepId } = await params
  const listing = await getHostListing(listingId)

  if (!listing) {
    redirect(`/host/overview`)
  }

  return (
    <HostContextProvider currentStep={stepId} listingId={listingId}>
      {children}
    </HostContextProvider>
  )
}
