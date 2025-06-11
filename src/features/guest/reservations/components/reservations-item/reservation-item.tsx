'use client'

import { format } from 'date-fns'
import { useLocale } from 'next-intl'
import { ReactElement, useMemo } from 'react'
import { ReservationStatus } from '@prisma/client'

import { ListMediaItem } from '@/components/organisms/list-media-item/list-media-item'
import { ListingMediaItemStatus } from '@/components/organisms/list-media-item/list-media-item-status'
import { localeToDateFnsLocale } from '@/utils/locale-to-date-fns-locale'

type ReservationItemProps = {
  id: string
  title: string
  image: { url: string; fileName: string } | null
  status: ReservationStatus
  startDate: Date
  endDate: Date
}

const reservationItemStatusMap = {
  [ReservationStatus.CANCELLED]: {
    type: ListingMediaItemStatus.DANGER,
    label: 'Cancelled by host',
  },
  [ReservationStatus.PENDING]: { type: ListingMediaItemStatus.WARNING, label: 'Waiting for host' },
  [ReservationStatus.CONFIRMED]: {
    type: ListingMediaItemStatus.SUCCESS,
    label: 'Confirmed by host',
  },
}

export function ReservationItem({
  id,
  image,
  title,
  status,
  startDate,
  endDate,
}: ReservationItemProps): ReactElement {
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
      href={`/guest/reservations/${id}`}
      status={{
        type: reservationItemStatusMap[status].type,
        label: reservationItemStatusMap[status].label,
      }}
      image={image}
      title={title}
      subtitle={subtitle}
    />
  )
}
