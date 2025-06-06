import { VariantProps } from 'class-variance-authority'
import { ReactElement } from 'react'

import { dividerClassNames } from '@/components/atoms/layout/divider/divider.class-names'
import { cn } from '@/utils/class-names'

type DividerProps = VariantProps<typeof dividerClassNames>

export function Divider({ 'bg-color': bgColor = 'deco', ...props }: DividerProps): ReactElement {
  const dividerClassName = cn(dividerClassNames({ 'bg-color': bgColor, ...props }))

  return <hr className={dividerClassName} />
}
