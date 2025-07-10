import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'

export const enum BookingCardStatusEnum {
  DANGER = 'DANGER',
  WARNING = 'WARNING',
  SUCCESS = 'SUCCESS',
  INFO = 'INFO',
}
type BookingCardStatusProps = {
  status: BookingCardStatusEnum
}
export function BookingCardStatus({
  status,
}: BookingCardStatusProps): ReactElement {
  return (
    <div className="absolute top-1.5 right-1.5 rounded-full p-[1px] bg-bg-primary">
      <FlexBox flex-direction="row" align-items="center" gap={2}>
        {status === BookingCardStatusEnum.DANGER && (
          <div className="bg-red-700 rounded-full h-2 w-2"></div>
        )}
        {status === BookingCardStatusEnum.WARNING && (
          <div className="bg-orange-600 rounded-full h-2 w-2"></div>
        )}
        {status === BookingCardStatusEnum.SUCCESS && (
          <div className="bg-green-600 rounded-full h-2 w-2"></div>
        )}
        {status === BookingCardStatusEnum.INFO && (
          <div className="bg-blue-600 rounded-full h-2 w-2"></div>
        )}
      </FlexBox>
    </div>
  )
}
