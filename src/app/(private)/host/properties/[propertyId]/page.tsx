import { redirect } from 'next/navigation'
import { ReactElement } from 'react'

import { getSession } from '@/features/auth/server/actions/get-current-user'
import { HostPropertyDetailPage } from '@/features/host/properties/host-property-detail/host-property-detail.page'
import { getHostProperty } from '@/features/host/properties/server/actions/get-host-properties'
import { isActionError } from '@/server/utils/error'

export default async function HostPropertyNextPage({
  params,
}: {
  params: Promise<{ propertyId: string }>
}): Promise<ReactElement> {
  const { propertyId } = await params
  const session = await getSession()
  const propertyResponse = await getHostProperty({
    propertyId,
    userId: session?.user?.id,
  })
  const property = isActionError(propertyResponse)
    ? null
    : (propertyResponse?.data ?? null)

  // if (property && property.status !== PropertyStatus.PUBLISHED) {
  if (property) {
    redirect(`/host/properties/${propertyId}/structure`)
  }

  if (!property) {
    redirect(`/host/properties`)
  }

  return <HostPropertyDetailPage />
}
