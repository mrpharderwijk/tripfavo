'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { ReactElement } from 'react'
import { PropertyStatus } from '@prisma/client'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { PropertyList } from '@/features/host/components/property-list/property-list'
import { HostPropertiesNoResults } from '@/features/host/properties/host-properties/components/host-properties-no-results/host-properties-no-results'
import { SafeHostProperty } from '@/features/host/properties/types/safe-host-property'

type HostPropertyOverviewProps = {
  properties: SafeHostProperty[]
}

export function HostPropertiesOverview({
  properties,
}: HostPropertyOverviewProps): ReactElement {
  const router = useRouter()
  const pendingProperties = properties?.filter(
    (property) => property.status === PropertyStatus.DRAFT,
  )
  const publishedProperties = properties?.filter(
    (property) => property.status === PropertyStatus.PUBLISHED,
  )

  // TODO: Add archived properties
  // const archivedProperties = properties?.filter(
  //   (property) => property.status === PropertyStatus.ARCHIVED,
  // )

  async function handleOnClickAddProperty(): Promise<void> {
    try {
      const response = await axios.post('/api/host/properties')
      router.push(`/host/${response.data.id}/structure`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <FlexBox flex-direction="col" gap={6}>
      {!properties?.length && <HostPropertiesNoResults />}

      {!!properties?.length && (
        <>
          <PropertyList
            heading="Published properties"
            items={publishedProperties}
          />
          <PropertyList
            heading="Pending properties"
            items={pendingProperties}
          />
        </>
      )}
    </FlexBox>
  )
}
