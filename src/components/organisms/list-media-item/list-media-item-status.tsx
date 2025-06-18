import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'

export const enum ListingMediaItemStatus {
  DANGER = 'DANGER',
  WARNING = 'WARNING',
  SUCCESS = 'SUCCESS',
  INFO = 'INFO',
}
type ListingMediaItemStatusProps = {
  status: ListingMediaItemStatus
}
export function ListMediaItemStatus({
  status,
}: ListingMediaItemStatusProps): ReactElement {
  return (
    <div className="absolute -top-1.5 -right-1.5 rounded-full p-0.5 bg-bg-primary">
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
      </FlexBox>
    </div>
  )
}
