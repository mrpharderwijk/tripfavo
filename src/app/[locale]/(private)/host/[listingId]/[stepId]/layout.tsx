import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'

import { getHostListing } from '@/features/host/actions/get-host-listings'
import { HostContextProvider } from '@/features/host/providers/host-context-provider'

type HostListingStepLayoutProps = PropsWithChildren<{
  params: Promise<{ locale: string; listingId: string; stepId: string }>
}>

export default async function HostListingStepLayout({
  children,
  params,
}: HostListingStepLayoutProps) {
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
