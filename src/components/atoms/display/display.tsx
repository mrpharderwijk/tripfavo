import { VariantProps } from 'class-variance-authority'
import { PropsWithChildren, ReactElement } from 'react'

import { displayClassNames } from '@/components/atoms/display/display.class-names'
import { PropsWithTestId } from '@/types'

type DisplayProps = PropsWithChildren<PropsWithTestId<VariantProps<typeof displayClassNames>>>

export function Display({
  show = false,
  'show-xs': showOnXs = false,
  'show-md': showOnMd = false,
  'show-lg': showOnLg = false,
  'show-xl': showOnXl = false,
  'show-2xl': showOn2xl = false,
  'show-3xl': showOn3xl = false,
  'data-testid': dataTestId,
  children,
}: DisplayProps): ReactElement {
  const displayClassName = displayClassNames({
    show,
    'show-xs': showOnXs,
    'show-md': showOnMd,
    'show-lg': showOnLg,
    'show-xl': showOnXl,
    'show-2xl': showOn2xl,
    'show-3xl': showOn3xl,
  })
  return (
    <div className={displayClassName} data-testid={dataTestId}>
      {children}
    </div>
  )
}
