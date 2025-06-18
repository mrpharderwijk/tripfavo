import { PropsWithChildren, ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { Body } from '@/components/atoms/typography/body/body'
import { FormNotificationIcon } from '@/components/molecules/form-notification/form-notification-icon'

export type FormNotificationProps = PropsWithChildren<{
  title?: string
  description: string
  variant: 'danger' | 'warning' | 'success' | 'info'
}>

export function FormNotification({
  title,
  description,
  variant,
}: FormNotificationProps): ReactElement {
  return (
    <FlexBox
      border-l={4}
      border-color={variant}
      bg-color={variant}
      flex-direction="row"
      align-items="start"
      justify-content="start"
      gap={3}
      padding={4}
    >
      <FlexBoxItem flex="initial">
        <FormNotificationIcon variant={variant} />
      </FlexBoxItem>
      <FlexBoxItem display="flex" flex="auto" flex-direction="col" gap={1}>
        {!!title && (
          <Body tag="span" size="base-lg" font-weight="bold">
            {title}
          </Body>
        )}
        <Body tag="span" size="base-md" font-weight="semibold">
          {description}
        </Body>
      </FlexBoxItem>
    </FlexBox>
  )
}
