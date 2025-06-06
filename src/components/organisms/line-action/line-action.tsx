import { PropsWithChildren, ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { Body } from '@/components/atoms/typography/body/body'

type LineActionProps = PropsWithChildren<{
  label: string
  actionElement: ReactElement
}>

export function LineAction({ children, label, actionElement }: LineActionProps) {
  return (
    <FlexBox
      flex-direction="row"
      gap={4}
      border-b={1}
      padding-y={6}
      border-color="deco"
      align-items="start"
      justify-content="start"
    >
      <FlexBoxItem display="flex" flex-direction="col" flex="auto" gap={1}>
        <FlexBox flex-direction="row" gap={4} align-items="center" justify-content="between">
          <Body tag="span" color="primary" font-weight="bold">
            {label}
          </Body>
          {!!actionElement && <FlexBoxItem flex="initial">{actionElement}</FlexBoxItem>}
        </FlexBox>

        {children}
      </FlexBoxItem>
    </FlexBox>
  )
}
