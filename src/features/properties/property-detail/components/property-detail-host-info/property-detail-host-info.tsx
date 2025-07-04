'use client'

import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { UserInfo } from '@/components/organisms/user-info/user-info'
import { usePropertyDetailContext } from '@/features/properties/property-detail/providers/property-detail-context-provider'

export function PropertyDetailHostInfo(): ReactElement {
  const {
    property: { host },
  } = usePropertyDetailContext()
  const tProperty = useTranslations('property')

  return (
    <UserInfo
      title={`${tProperty('host.label')} ${host.name?.firstName}`}
      subtitle="1 month ago"
      imageUrl={host.profileImage ?? '/placeholder.png'}
    />
  )
}
