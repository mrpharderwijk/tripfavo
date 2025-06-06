'use client'

import { useSearchParams } from 'next/navigation'

import { Divider } from '@/components/atoms/layout/divider/divider'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { PublicListing } from '@/features/listings/types/public-listing'
import { ReservationDetailListing } from '@/features/reservations/reservation-detail/components/reservation-detail-listing/reservation-detail-listing'
import { ReservationDetailSummary } from '@/features/reservations/reservation-detail/components/reservation-detail-summary/reservation-detail-summary'
import { ReservationDetailContextProvider } from '@/features/reservations/reservation-detail/providers/reservation-detail-context-provider'

type ReservationDetailPageProps = {
  listing: PublicListing
}

export function ReservationDetailPage({ listing }: ReservationDetailPageProps) {
  const searchParams = useSearchParams()
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')

  return (
    <ReservationDetailContextProvider listing={listing} startDate={startDate} endDate={endDate}>
      <FlexBox flex-direction="col" gap={6} padding-x={6} padding-t={6}>
        <ReservationDetailListing />

        <Divider />

        <ReservationDetailSummary />
      </FlexBox>
    </ReservationDetailContextProvider>
  )
}
