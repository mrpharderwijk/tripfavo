import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'

export const enum PropertyMediaItemStatus {
  DANGER = 'DANGER',
  WARNING = 'WARNING',
  SUCCESS = 'SUCCESS',
  INFO = 'INFO',
}
type PropertyMediaItemStatusProps = {
  status: PropertyMediaItemStatus
}
export function ListMediaItemStatus({
  status,
}: PropertyMediaItemStatusProps): ReactElement {
  return (
    <div className="absolute -top-1.5 -right-1.5 rounded-full p-0.5 bg-bg-primary">
      <FlexBox flex-direction="row" align-items="center" gap={2}>
        {status === PropertyMediaItemStatus.DANGER && (
          <div className="bg-red-700 rounded-full h-3 w-3"></div>
        )}
        {status === PropertyMediaItemStatus.WARNING && (
          <div className="bg-orange-600 rounded-full h-3 w-3"></div>
        )}
        {status === PropertyMediaItemStatus.SUCCESS && (
          <div className="bg-green-600 rounded-full h-3 w-3"></div>
        )}
        {status === PropertyMediaItemStatus.INFO && (
          <div className="bg-blue-600 rounded-full h-3 w-3"></div>
        )}
      </FlexBox>
    </div>
  )
}
