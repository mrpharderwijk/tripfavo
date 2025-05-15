import { type VariantProps } from 'class-variance-authority'
import { ReactElement } from 'react'

import { loaderClassNames, loaderVariants } from './loader.class-names'

import { PropsWithTestId } from '@/types'
import { cn } from '@/utils/class-names'

export type LoaderProps = PropsWithTestId<VariantProps<typeof loaderClassNames>>

export function Loader({
  'data-testid': dataTestid,
  size,
}: LoaderProps): ReactElement {
  return (
    <div
      className={cn(loaderClassNames({ size }))}
      aria-label="Loading..."
      data-testid={dataTestid}
    />
  )
}

// Export for Storybook
Loader.sizes = Object.keys(loaderVariants.size) as Array<LoaderProps['size']>
