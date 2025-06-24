'use client'

import { format } from 'date-fns'
import { useLocale } from 'next-intl'
import { ReactElement, useMemo } from 'react'
import { BookingStatus } from '@prisma/client'

import { ListMediaItem } from '@/components/organisms/list-media-item/list-media-item'
import { ListingMediaItemStatus } from '@/components/organisms/list-media-item/list-media-item-status'
import { localeToDateFnsLocale } from '@/utils/locale-to-date-fns-locale'

type HostBookingItemProps = {
  id: string
  title: string
  image: { url: string; fileName: string } | null
  status: BookingStatus
  startDate: Date
  endDate: Date
}

const bookingItemStatusMap = {
  [BookingStatus.CANCELLED]: ListingMediaItemStatus.DANGER,
  [BookingStatus.PENDING]: ListingMediaItemStatus.WARNING,
  [BookingStatus.CONFIRMED]: ListingMediaItemStatus.SUCCESS,
}

export function HostBookingListItem({
  id,
  image,
  title,
  status,
  startDate,
  endDate,
}: HostBookingItemProps): ReactElement {
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
    <ListMediaItem
      href={`/guest/bookings/${id}`}
      status={bookingItemStatusMap[status]}
      image={image}
      title={title}
      subtitle={subtitle}
    />
  )
}
