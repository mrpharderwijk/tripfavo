import { PropsWithChildren } from 'react'
import { ReactElement } from 'react'

import { Body } from '@/components/atoms/typography/body/body'

/** Wrapper for the weekday */
export function CustomWeekday({ children }: PropsWithChildren): ReactElement {
  return (
    <div className="relative w-full" data-testid="custom-weekday">
      <Body color="secondary" size="base-mdt" text-align="center" font-weight="medium">
        {children}
      </Body>
    </div>
  )
}
