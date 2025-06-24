'use client'

import { ReactElement } from 'react'

import { BookingsList } from '@/features/bookings/bookings-list/bookings-list'
import { useBookingsContext } from '@/features/bookings/providers/bookings-context-provider'
import { HostBookingsNoResults } from '@/features/host/bookings/host-bookings/components/host-bookings-no-results/host-bookings-no-results'

export const enum OrderByEnum {
  DATE = 'date',
  PRICE = 'price',
}

export const enum SortEnum {
  ASC = 'asc',
  DESC = 'desc',
}

export function HostBookingsOverview(): ReactElement {
  const { bookings, sort, toggleSort } = useBookingsContext()

  return (
    <>
      {!bookings?.length && <HostBookingsNoResults />}
      {!!bookings?.length && <BookingsList urlBasePath="/host/bookings" />}
    </>
  )
}
