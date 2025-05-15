import { VariantProps } from 'class-variance-authority'

import {
  dotLoaderClassNames,
  dotLoaderWrapperClassNames,
} from '@/components/atoms/dot-loader/dot-loader.class-names'
import { cn } from '@/utils/class-names'

type DotLoaderProps = VariantProps<typeof dotLoaderClassNames>

export function DotLoader({ color = 'black', size = 'md' }: DotLoaderProps) {
  const wrapperClassName = cn(dotLoaderWrapperClassNames({ size }))
  const dotClassName = cn(dotLoaderClassNames({ color, size }))

  return (
    <div className={wrapperClassName} role="status" aria-label="Loading">
      <div className={cn('delay-800', dotClassName)} />
      <div className={cn('delay-400', dotClassName)} />
      <div className={cn('delay-0', dotClassName)} />
      <span className="sr-only">Loading...</span>
    </div>
  )
}
