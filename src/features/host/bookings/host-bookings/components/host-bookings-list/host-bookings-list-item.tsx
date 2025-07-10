'use client'

import { format } from 'date-fns'
import { useLocale } from 'next-intl'
import { ReactElement, useMemo } from 'react'
import { BookingStatus } from '@prisma/client'

import { ListMediaItem } from '@/components/organisms/list-media-item/list-media-item'
import { PropertyMediaItemStatus } from '@/components/organisms/list-media-item/list-media-item-status'
import { localeToDateFnsLocale } from '@/utils/locale-to-date-fns-locale'

type HostBookingItemProps = {
  id: string
  title: string
  image: { url: string; fileName: string } | null
  status: BookingStatus
  startDate: string
  endDate: string
}

const bookingItemStatusMap = {
  [BookingStatus.CANCELLED]: PropertyMediaItemStatus.DANGER,
  [BookingStatus.PENDING]: PropertyMediaItemStatus.WARNING,
  [BookingStatus.CONFIRMED]: PropertyMediaItemStatus.SUCCESS,
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
