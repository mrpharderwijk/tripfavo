import { cva } from 'class-variance-authority'

import { gapVariants, marginVariants, paddingVariants } from '@/utils/variants'
import { gridColsVariants } from '@/utils/variants/grid/grid-cols'

export const gridClassNames = cva('grid', {
  variants: {
    ...gapVariants,
    ...gridColsVariants,
    ...paddingVariants,
    ...marginVariants,
  },
})
