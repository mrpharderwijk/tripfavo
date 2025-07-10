import { cva } from 'class-variance-authority'

import {
  fullHeightVariants,
  fullWidthVariants,
  paddingVariants,
  positionVariants,
} from '@/utils/variants'
import { marginVariants } from '@/utils/variants/margin'

export const anchorClassNames = cva('', {
  variants: {
    ...marginVariants,
    ...paddingVariants,
    ...fullWidthVariants,
    ...fullHeightVariants,
    ...positionVariants,
  },
})
