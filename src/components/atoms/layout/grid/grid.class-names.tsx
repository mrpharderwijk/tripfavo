import { cva } from 'class-variance-authority'

import {
  fullHeightVariants,
  fullWidthVariants,
  gapVariants,
  heightVariants,
  marginVariants,
  paddingVariants,
  widthVariants,
} from '@/utils/variants'
import { gridColsVariants } from '@/utils/variants/grid/grid-cols'
import { gridPlaceItemsVariants } from '@/utils/variants/grid/place-items'

export const gridClassNames = cva('grid', {
  variants: {
    ...gapVariants,
    ...gridColsVariants,
    ...gridPlaceItemsVariants,
    ...paddingVariants,
    ...marginVariants,
    ...heightVariants,
    ...fullWidthVariants,
    ...fullHeightVariants,
    ...widthVariants,
    ...heightVariants,
  },
})
