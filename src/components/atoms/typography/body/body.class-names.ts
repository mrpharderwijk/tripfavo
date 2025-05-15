import { cva } from 'class-variance-authority'

import { fontWeightVariants, textAlignVariants } from '@/utils/variants'

export const bodyClassNames = cva('', {
  variants: {
    ...fontWeightVariants,
    ...textAlignVariants,
  },
  defaultVariants: {
    'font-weight': 'medium',
  },
})
