import React, { ReactElement } from 'react'

import { Body } from '@/components/atoms/typography/body/body'
import { useCountDown } from '@/hooks/use-count-down/use-count-down'

type VerifyOtpCountDownProps = {
  expires: Date
}

export function VerifyOtpCountDown({
  expires,
}: VerifyOtpCountDownProps): ReactElement | null {
  const timeLeft = useCountDown(expires)

  function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
  }

  return timeLeft ? (
    <Body size="base-sm" color="gray">
      Time left: {formatTime(timeLeft)}
    </Body>
  ) : null
}
