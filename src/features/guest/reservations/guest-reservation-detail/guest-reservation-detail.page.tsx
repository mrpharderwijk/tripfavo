'use client'

import { ReactElement, Suspense } from 'react'

import { DotLoader } from '@/components/atoms/dot-loader/dot-loader'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { GuestReservationDetailListing } from '@/features/guest/reservations/guest-reservation-detail/components/guest-reservation-detail-listing/guest-reservation-detail-listing'
import { GuestReservationDetailContextProvider } from '@/features/guest/reservations/guest-reservation-detail/providers/guest-reservation-detail-context-provider'
import { GuestReservation } from '@/features/guest/types/guest-reservation'

type GuestReservationDetailPageProps = {
  reservation: GuestReservation | null
}

export function GuestReservationDetailPage({
  reservation,
}: GuestReservationDetailPageProps): ReactElement {
  return (
    <GuestReservationDetailContextProvider reservation={reservation}>
      <FlexBox flex-direction="col" gap={6} padding-x={6} padding-top={6}>
        <Suspense fallback={<DotLoader />}>
          <GuestReservationDetailListing />
        </Suspense>
      </FlexBox>
    </GuestReservationDetailContextProvider>
  )
}
