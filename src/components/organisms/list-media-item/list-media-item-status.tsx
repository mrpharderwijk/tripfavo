import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Body } from '@/components/atoms/typography/body/body'

export const enum ListingMediaItemStatus {
  DANGER = 'DANGER',
  WARNING = 'WARNING',
  SUCCESS = 'SUCCESS',
  INFO = 'INFO',
}
type ListingMediaItemStatusProps = {
  status: ListingMediaItemStatus
  label: string
}
export function ListMediaItemStatus({ status, label }: ListingMediaItemStatusProps): ReactElement {
  return (
    <div className="absolute bottom-4 right-4 border-1 border-border-secondary-disabled rounded-full px-2 py-1">
      <FlexBox flex-direction="row" align-items="center" gap={2}>
        {status === ListingMediaItemStatus.DANGER && (
          <div className="bg-red-700 rounded-full h-3 w-3"></div>
        )}
        {status === ListingMediaItemStatus.WARNING && (
          <div className="bg-orange-600 rounded-full h-3 w-3"></div>
        )}
        {status === ListingMediaItemStatus.SUCCESS && (
          <div className="bg-green-600 rounded-full h-3 w-3"></div>
        )}
        {status === ListingMediaItemStatus.INFO && (
          <div className="bg-blue-600 rounded-full h-3 w-3"></div>
        )}

        <Body size="base-sm" color="secondary">
          {label}
        </Body>
      </FlexBox>
    </div>
  )
}
