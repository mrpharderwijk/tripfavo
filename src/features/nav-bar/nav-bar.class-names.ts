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

export const navBarContainerClassNames = cva('w-full', {
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

export const navBarClassNames = cva('w-full relative z-10', {
  variants: {
    border: {
      true: 'border-b border-deco',
      false: '',
    },
    subnav: {
      true: 'shadow-sm',
      false: '',
    },
  },
})
