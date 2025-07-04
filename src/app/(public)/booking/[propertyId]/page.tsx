import { notFound } from 'next/navigation'
import { ReactElement } from 'react'

import { BookingDetailPage } from '@/features/bookings/booking-detail/booking-detail.page'
import { getPublishedProperty } from '@/features/properties/server/actions/get-properties'
import { isActionError } from '@/server/utils/error'

type BookingPageProps = {
  params: Promise<{ propertyId: string }>
  searchParams: Promise<{ startDate?: string; endDate?: string }>
}

export default async function BookingPage({
  params,
  searchParams,
}: BookingPageProps): Promise<ReactElement> {
  const { propertyId } = await params
  const propertyResponse = await getPublishedProperty(propertyId)
  const property = isActionError(propertyResponse)
    ? null
    : (propertyResponse?.data ?? null)

  if (!property) {
    notFound()
  }

  return <BookingDetailPage property={property} />
}
