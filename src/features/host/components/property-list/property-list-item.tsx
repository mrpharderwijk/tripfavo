'use client'

import { format } from 'date-fns'
import { useLocale, useTranslations } from 'next-intl'
import { ReactElement, useMemo } from 'react'
import { PropertyStatus } from '@prisma/client'

import { ListMediaItem } from '@/components/organisms/list-media-item/list-media-item'
import { PropertyMediaItemStatus } from '@/components/organisms/list-media-item/list-media-item-status'
import { SafeHostProperty } from '@/features/host/properties/types/safe-host-property'
import { localeToDateFnsLocale } from '@/utils/locale-to-date-fns-locale'

type PropertyItemProps = SafeHostProperty

const propertyMediaItemStatusMap = {
  [PropertyStatus.DRAFT]: PropertyMediaItemStatus.DANGER,
  [PropertyStatus.IN_REVIEW]: PropertyMediaItemStatus.WARNING,
  [PropertyStatus.PUBLISHED]: PropertyMediaItemStatus.SUCCESS,
}

export function PropertyItem({
  id,
  title,
  location,
  images,
  status,
  createdAt,
}: PropertyItemProps): ReactElement {
  const locale = useLocale()
  const tHost = useTranslations('host')
  const tHostProperty = useTranslations('host.property')
  const featuredImage =
    images?.find((image) => image.isMain) ?? images?.[0] ?? null

  const propertyMediaItemTitle = useMemo(() => {
    if (title) {
      return title
    }

    if (!title && !!location?.city) {
      return `${tHost('property.yourProperty')} ${location?.city}`
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

    return tHostProperty('overview.createdAt', {
      date: `${startDate} - ${endDate}`,
    })
  }, [createdAt, locale, tHostProperty])

  return (
    <ListMediaItem
      href={`/host/properties/${id}`}
      status={propertyMediaItemStatusMap[status]}
      image={featuredImage ?? { url: '', fileName: '' }}
      title={propertyMediaItemTitle}
      subtitle={subtitle}
    />
  )
}
