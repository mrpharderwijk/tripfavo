import { cva } from 'class-variance-authority'

import { fontWeightVariants, paddingVariants, textAlignVariants } from '@/utils/variants'

export const bodyClassNames = cva('', {
  variants: {
    ...fontWeightVariants,
    ...textAlignVariants,
    ...paddingVariants,
  },
  defaultVariants: {
    'font-weight': 'medium',
  },
})
