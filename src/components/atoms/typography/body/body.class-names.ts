import { cva } from 'class-variance-authority'

import {
  fontWeightVariants,
  paddingVariants,
  textAlignVariants,
  textOverflowVariants,
} from '@/utils/variants'

export const bodyClassNames = cva('', {
  variants: {
    ...fontWeightVariants,
    ...textAlignVariants,
    ...paddingVariants,
    ...textOverflowVariants,
  },
  defaultVariants: {
    'font-weight': 'medium',
  },
})
