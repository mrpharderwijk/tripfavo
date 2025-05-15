import { cva } from 'class-variance-authority'

import { backgroundColorVariants, paddingVariants } from '@/utils/variants'

export const backgroundClassNames = cva('', {
  variants: {
    ...backgroundColorVariants,
    ...paddingVariants,
    fullWidth: {
      true: 'w-full',
      false: undefined,
    },
  },
  defaultVariants: {
    fullWidth: true,
  },
})
