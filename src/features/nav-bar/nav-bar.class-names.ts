import { cva } from 'class-variance-authority'

import {
  backgroundColorVariants,
  bottomVariants,
  leftVariants,
  positionVariants,
  rightVariants,
  topVariants,
  zIndexVariants,
} from '@/utils/variants'

export const navBarClassNames = cva('w-full', {
  variants: {
    ...positionVariants,
    ...topVariants,
    ...leftVariants,
    ...rightVariants,
    ...bottomVariants,
    ...zIndexVariants,
    ...backgroundColorVariants,
    border: {
      true: 'border-b border-deco',
      false: '',
    },
  },
})
