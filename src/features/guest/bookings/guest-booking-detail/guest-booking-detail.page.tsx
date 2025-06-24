'use client'

import { ReactElement, Suspense } from 'react'

import { DotLoader } from '@/components/atoms/dot-loader/dot-loader'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { SafeBooking } from '@/features/bookings/types/booking'
import { GuestBookingDetailListing } from '@/features/guest/bookings/guest-booking-detail/components/guest-booking-detail-listing/guest-booking-detail-listing'
import { GuestBookingDetailContextProvider } from '@/features/guest/bookings/guest-booking-detail/providers/guest-booking-detail-context-provider'

type GuestBookingDetailPageProps = {
  booking: SafeBooking | null
}

export function GuestBookingDetailPage({
  booking,
}: GuestBookingDetailPageProps): ReactElement {
  return (
    <GuestBookingDetailContextProvider booking={booking}>
      <FlexBox flex-direction="col" gap={6} padding-x={6} padding-top={6}>
        <Suspense fallback={<DotLoader />}>
          <GuestBookingDetailListing />
        </Suspense>
      </FlexBox>
    </GuestBookingDetailContextProvider>
  )
}
