import { VariantProps } from 'class-variance-authority'
import { TriangleAlert } from 'lucide-react'
import { ReactElement } from 'react'
import { IconType } from 'react-icons'

import { formNotificationClassNames } from '@/components/molecules/form-notification/form-notification.class-names'

type FormNotificationProps = {
  variant: VariantProps<typeof formNotificationClassNames>['variant']
}

const iconMap: {
  [key: string]: IconType
} = {
  warning: TriangleAlert,
  danger: TriangleAlert,
  info: TriangleAlert,
  success: TriangleAlert,
}

export function FormNotificationIcon({ variant }: FormNotificationProps): ReactElement | null {
  if (!variant) {
    return null
  }

  const Icon = iconMap[variant]

  return <Icon />
}
