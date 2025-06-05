import { cva } from 'class-variance-authority'

import { backgroundColorVariants, marginVariants, paddingVariants } from '@/utils/variants'

export const dividerClassNames = cva('w-full h-px border-0', {
  variants: {
    ...marginVariants,
    ...paddingVariants,
    ...backgroundColorVariants,
  },
})
