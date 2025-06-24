'use client'

import { format } from 'date-fns'
import { useLocale } from 'next-intl'
import { ReactElement, useMemo } from 'react'
import { BookingStatus } from '@prisma/client'

import { BookingCard } from '@/features/bookings/bookings-list/booking-card'
import { BookingCardStatusEnum } from '@/features/bookings/bookings-list/booking-card-status'
import { localeToDateFnsLocale } from '@/utils/locale-to-date-fns-locale'

type BookingsListItemProps = {
  id: string
  title: string
  urlBasePath: string
  image: { url: string; fileName: string } | null
  status: BookingStatus
  startDate: Date
  endDate: Date
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
  endDate,
}: BookingsListItemProps): ReactElement {
  const locale = useLocale()
  const subtitle = useMemo(() => {
    const startDateFormatted = format(startDate, 'dd-MM-yyyy', {
      locale: localeToDateFnsLocale(locale),
    })
    const endDateFormatted = format(endDate, 'dd-MM-yyyy', {
      locale: localeToDateFnsLocale(locale),
    })

    return `${startDateFormatted} - ${endDateFormatted}`
  }, [startDate, endDate, locale])

  return (
    <BookingCard
      href={`${urlBasePath}${id ? `/${id}` : ''}`}
      status={bookingsListItemStatusMap[status]}
      image={image}
      title={title}
      subtitle={subtitle}
    />
  )
}
