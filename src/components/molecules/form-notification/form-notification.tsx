import { PropsWithChildren, ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { FormNotificationIcon } from '@/components/molecules/form-notification/form-notification-icon'

export type FormNotificationProps = PropsWithChildren<{
  variant: 'danger' | 'warning' | 'success' | 'info'
}>

export function FormNotification({ children, variant }: FormNotificationProps): ReactElement {
  return (
    <FlexBox
      border-l={4}
      border-color={variant}
      bg-color={variant}
      flex-direction="row"
      align-items="center"
      justify-content="start"
      gap={2}
      padding={4}
    >
      <FlexBoxItem flex="initial">
        <FormNotificationIcon variant={variant} />
      </FlexBoxItem>
      <FlexBoxItem flex="auto">{children}</FlexBoxItem>
    </FlexBox>
  )
}
