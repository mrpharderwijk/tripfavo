import { CheckIcon, OctagonXIcon } from 'lucide-react'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { Body } from '@/components/atoms/typography/body/body'

type InputPasswordFeedbackProps = {
  validMessage?: string
  invalidMessage: string
  valid?: boolean
}

export function InputPasswordFeedback({
  validMessage,
  invalidMessage,
  valid,
}: InputPasswordFeedbackProps): ReactElement {
  return (
    <FlexBox flex-direction="row" align-items="center" gap={2}>
      <FlexBoxItem flex="initial">
        {valid ? (
          <CheckIcon size={16} color="var(--color-icon-success)" />
        ) : (
          <OctagonXIcon size={16} color="var(--color-icon-error)" />
        )}
      </FlexBoxItem>

      <FlexBoxItem flex="auto">
        <Body size="base-sm">{!valid ? invalidMessage : (validMessage ?? invalidMessage)}</Body>
      </FlexBoxItem>
    </FlexBox>
  )
}
