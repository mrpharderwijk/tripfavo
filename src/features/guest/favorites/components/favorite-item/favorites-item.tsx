'use client'

import { useLocale } from 'next-intl'
import { ReactElement } from 'react'
import { ReservationStatus } from '@prisma/client'

import { ListMediaItem } from '@/components/organisms/list-media-item/list-media-item'
import { ListingMediaItemStatus } from '@/components/organisms/list-media-item/list-media-item-status'

type ReservationItemProps = {
  id: string
  title: string
  image: { url: string; fileName: string } | null
  subtitle: string
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

export function FavoritesItem({
  id,
  image,
  title,
  subtitle,
}: ReservationItemProps): ReactElement {
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
