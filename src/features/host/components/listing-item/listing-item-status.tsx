import { useTranslations } from 'next-intl'
import { ListingStatus } from '@prisma/client'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Body } from '@/components/atoms/typography/body/body'

type ListingItemStatusProps = {
  status: ListingStatus
}

export function ListingItemStatus({ status }: ListingItemStatusProps) {
  const tHost = useTranslations('host')

  return (
    <div className="absolute bottom-4 right-4 border-1 border-border-secondary-disabled rounded-full px-2 py-1">
      <FlexBox flex-direction="row" align-items="center" gap={2}>
        {status === ListingStatus.DRAFT && <div className="bg-red-700 rounded-full h-3 w-3"></div>}
        {status === ListingStatus.IN_REVIEW && (
          <div className="bg-orange-600 rounded-full h-3 w-3"></div>
        )}
        {status === ListingStatus.PUBLISHED && (
          <div className="bg-green-600 rounded-full h-3 w-3"></div>
        )}

        <Body size="base-sm" color="secondary">
          {status === ListingStatus.DRAFT && tHost('listing.status.draft')}
          {status === ListingStatus.IN_REVIEW && tHost('listing.status.inReview')}
          {status === ListingStatus.PUBLISHED && tHost('listing.status.published')}
        </Body>
      </FlexBox>
    </div>
  )
}
