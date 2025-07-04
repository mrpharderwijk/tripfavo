import { PropsWithChildren, ReactElement } from 'react'

import { getSession } from '@/features/auth/server/actions/get-current-user'
import { HostContextProvider } from '@/features/host/properties/providers/host-context-provider'
import { getHostProperty } from '@/features/host/properties/server/actions/get-host-properties'
import { isActionError } from '@/server/utils/error'

type HostPropertyStepLayoutProps = PropsWithChildren<{
  params: Promise<{ propertyId: string; stepId: string }>
}>

export default async function HostPropertyStepLayout({
  children,
  params,
}: HostPropertyStepLayoutProps): Promise<ReactElement> {
  const { propertyId, stepId } = await params
  const session = await getSession()
  const propertyResponse = await getHostProperty({
    userId: session?.user.id,
    propertyId,
  })
  const property = isActionError(propertyResponse)
    ? null
    : (propertyResponse?.data ?? null)

  return (
    <HostContextProvider currentStep={stepId} propertyId={propertyId}>
      {children}
    </HostContextProvider>
  )
}
