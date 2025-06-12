'use client'

import { format } from 'date-fns'
import { useLocale, useTranslations } from 'next-intl'
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
    translationKey: 'cancelled',
  },
  [ReservationStatus.PENDING]: { type: ListingMediaItemStatus.WARNING, translationKey: 'review' },
  [ReservationStatus.CONFIRMED]: {
    type: ListingMediaItemStatus.SUCCESS,
    translationKey: 'confirmed',
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
  const tGuestReservationStatus = useTranslations('guest.reservations.status')
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
        label: tGuestReservationStatus(reservationItemStatusMap[status].translationKey),
      }}
      image={image}
      title={title}
      subtitle={subtitle}
    />
  )
}
