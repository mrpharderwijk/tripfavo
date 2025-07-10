import { notFound } from 'next/navigation'
import { ReactElement } from 'react'

import { PropertyDetailPage } from '@/features/properties/property-detail/property-detail.page'
import { getPublishedProperty } from '@/features/properties/server/actions/get-properties'
import { isActionError } from '@/server/utils/error'

type PropertyPageProps = {
  params: Promise<{ propertyId: string }>
}

export default async function PropertyPage({
  params,
}: PropertyPageProps): Promise<ReactElement> {
  const { propertyId } = await params
  const propertyResponse = await getPublishedProperty(propertyId)
  const property = isActionError(propertyResponse)
    ? null
    : (propertyResponse?.data ?? null)
  if (!property) {
    notFound()
  }

  return <PropertyDetailPage property={property} />
}
