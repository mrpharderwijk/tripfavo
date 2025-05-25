import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'

import { getListingByLoggedInUser } from '@/actions/get-listing-by-logged-in-user'
import { HostContextProvider } from '@/features/host/providers/host-context-provider'

type HostListingStepLayoutProps = PropsWithChildren<{
  params: Promise<{ locale: string; listingId: string; stepId: string }>
}>

export default async function HostListingStepLayout({
  children,
  params,
}: HostListingStepLayoutProps) {
  const { listingId, stepId } = await params

  const listing = await getListingByLoggedInUser(listingId)

  if (!listing) {
    redirect(`/host/overview`)
  }

  return (
    <HostContextProvider currentStep={stepId} listingId={listingId} listing={listing}>
      {children}
    </HostContextProvider>
  )
}
