'use client'

import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { BookingsList } from '@/features/bookings/bookings-list/bookings-list'
import { useBookingsContext } from '@/features/bookings/providers/bookings-context-provider'
import { GuestBookingsNoResults } from '@/features/guest/bookings/guest-bookings/components/guest-bookings-no-results/guest-bookings-no-results'

export function GuestBookingsOverview(): ReactElement {
  const { bookings } = useBookingsContext()

  return (
    <FlexBox flex-direction="col" gap={6}>
      {!bookings?.length && <GuestBookingsNoResults />}

      {!!bookings?.length && (
        <FlexBox flex-direction="col" gap={6}>
          <BookingsList urlBasePath="/guest/bookings" />
        </FlexBox>
      )}
    </FlexBox>
  )
}
