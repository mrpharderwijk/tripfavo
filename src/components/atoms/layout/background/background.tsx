import { VariantProps } from 'class-variance-authority'
import { PropsWithChildren, ReactElement } from 'react'

import { backgroundClassNames } from './background.class-names'

import { PropsWithTestId } from '@/types'
import { cn } from '@/utils/class-names'

export type BackgroundProps = PropsWithChildren<
  PropsWithTestId<VariantProps<typeof backgroundClassNames>>
>

export function Background({
  children,
  ...backgroundProps
}: BackgroundProps): ReactElement {
  const backgroundClassName = cn(backgroundClassNames({ ...backgroundProps }))

  return <div className={backgroundClassName}>{children}</div>
}
