'use client'

import { format } from 'date-fns'
import { useLocale, useTranslations } from 'next-intl'
import { ReactElement, useMemo } from 'react'
import { ListingStatus } from '@prisma/client'

import { ListMediaItem } from '@/components/organisms/list-media-item/list-media-item'
import { ListingMediaItemStatus } from '@/components/organisms/list-media-item/list-media-item-status'
import { HostListing } from '@/features/host/types/host-listing'
import { localeToDateFnsLocale } from '@/utils/locale-to-date-fns-locale'

type ListingItemProps = HostListing

const listingMediaItemStatusMap = {
  [ListingStatus.DRAFT]: ListingMediaItemStatus.DANGER,
  [ListingStatus.IN_REVIEW]: ListingMediaItemStatus.WARNING,
  [ListingStatus.PUBLISHED]: ListingMediaItemStatus.SUCCESS,
}

export function ListingItem({
  id,
  title,
  location,
  images,
  status,
  createdAt,
}: ListingItemProps): ReactElement {
  const locale = useLocale()
  const tHost = useTranslations('host')
  const tHostListingStatus = useTranslations('host.listing.status')
  const featuredImage =
    images?.find((image) => image.isMain) ?? images?.[0] ?? null
  const listingMediaItemTitle = useMemo(() => {
    if (title) {
      return title
    }

    if (!title && !!location?.city) {
      return `${tHost('listing.yourListing')} ${location?.city}`
    }

    return ''
  }, [title, location?.city, tHost])

  const subtitle = useMemo(() => {
    const startDate = format(createdAt, 'PPPP', {
      locale: localeToDateFnsLocale(locale),
    })
    const endDate = format(createdAt, 'HH:mm', {
      locale: localeToDateFnsLocale(locale),
    })

    return `${startDate} - ${endDate}`
  }, [createdAt, locale])

  return (
    <ListMediaItem
      href={`/host/${id}/structure`}
      status={listingMediaItemStatusMap[status]}
      image={featuredImage ?? { url: '', fileName: '' }}
      title={listingMediaItemTitle}
      subtitle={subtitle}
    />
  )
}
