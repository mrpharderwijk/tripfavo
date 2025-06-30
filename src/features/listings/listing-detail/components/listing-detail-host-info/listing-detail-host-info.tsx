'use client'

import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { UserInfo } from '@/components/organisms/user-info/user-info'
import { useListingDetailContext } from '@/features/listings/listing-detail/providers/listing-detail-context-provider'

export function ListingDetailHostInfo(): ReactElement {
  const {
    listing: { host },
  } = useListingDetailContext()
  const tListing = useTranslations('listing')

  return (
    <UserInfo
      title={`${tListing('host.label')} ${host.name?.firstName}`}
      subtitle="1 month ago"
      imageUrl={host.profileImage ?? '/placeholder.png'}
    />
  )
}
