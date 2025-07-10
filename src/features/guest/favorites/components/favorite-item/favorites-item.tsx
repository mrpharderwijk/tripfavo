'use client'

import { useLocale } from 'next-intl'
import { ReactElement } from 'react'
import { BookingStatus } from '@prisma/client'

import { ListMediaItem } from '@/components/organisms/list-media-item/list-media-item'
import { PropertyMediaItemStatus } from '@/components/organisms/list-media-item/list-media-item-status'

type BookingItemProps = {
  id: string
  title: string
  image: { url: string; fileName: string } | null
  subtitle: string
}

const bookingItemStatusMap = {
  [BookingStatus.CANCELLED]: {
    type: PropertyMediaItemStatus.DANGER,
    label: 'Cancelled by host',
  },
  [BookingStatus.PENDING]: {
    type: PropertyMediaItemStatus.WARNING,
    label: 'Waiting for host',
  },
  [BookingStatus.CONFIRMED]: {
    type: PropertyMediaItemStatus.SUCCESS,
    label: 'Confirmed by host',
  },
}

export function FavoritesItem({
  id,
  image,
  title,
  subtitle,
}: BookingItemProps): ReactElement {
  const locale = useLocale()

  return (
    <ListMediaItem
      href={`/guest/favorites/${id}`}
      image={image}
      title={title}
      subtitle={subtitle}
    />
  )
}
