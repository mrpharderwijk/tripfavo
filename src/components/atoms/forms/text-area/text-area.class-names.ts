import { cva } from 'class-variance-authority'

import { minHeightVariants } from '@/utils/variants/sizing/min-height'

export const textAreaClassNames = cva(
  'w-full pt-5 px-4 pb-1 border border-border-quarternary rounded-lg transition-all duration-200 text-base-lg font-medium text-text-primary outline-offset-2 outline-black',
  {
    variants: {
      ...minHeightVariants,
    },
  },
)
