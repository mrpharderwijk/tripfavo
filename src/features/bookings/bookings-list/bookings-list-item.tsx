'use client'

import { useLocale } from 'next-intl'
import { ReactElement } from 'react'
import { BookingStatus } from '@prisma/client'

import { BookingCard } from '@/features/bookings/bookings-list/booking-card'
import { BookingCardStatusEnum } from '@/features/bookings/bookings-list/booking-card-status'

type BookingsListItemProps = {
  id: string
  title: string
  urlBasePath: string
  image: { url: string; fileName: string } | null
  status: BookingStatus
  startDate: string
  endDate: string
  location: { city: string; country: string }
}

const bookingsListItemStatusMap = {
  [BookingStatus.CANCELLED]: BookingCardStatusEnum.DANGER,
  [BookingStatus.PENDING]: BookingCardStatusEnum.WARNING,
  [BookingStatus.CONFIRMED]: BookingCardStatusEnum.SUCCESS,
}

export function BookingsListItem({
  id,
  urlBasePath,
  image,
  title,
  status,
  startDate,
  location,
  endDate,
}: BookingsListItemProps): ReactElement {
  const locale = useLocale()

  return (
    <BookingCard
      href={`${urlBasePath}${id ? `/${id}` : ''}`}
      image={image ?? null}
      title={title}
      location={`${location.city}, ${location.country}`}
      checkInDate={startDate}
      checkOutDate={endDate}
      totalPrice={'$ 300'}
      status={bookingsListItemStatusMap[status]}
      nights={3}
    />
  )
}
