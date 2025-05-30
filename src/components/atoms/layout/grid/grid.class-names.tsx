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
import { gridRowsVariants } from '@/utils/variants/grid/grid-rows'
import { gridPlaceItemsVariants } from '@/utils/variants/grid/place-items'
import { maxHeightVariants } from '@/utils/variants/sizing/max-height'
import { minHeightVariants } from '@/utils/variants/sizing/min-height'

export const gridClassNames = cva('grid', {
  variants: {
    ...gapVariants,
    ...gridColsVariants,
    ...gridRowsVariants,
    ...gridPlaceItemsVariants,
    ...paddingVariants,
    ...marginVariants,
    ...heightVariants,
    ...fullWidthVariants,
    ...fullHeightVariants,
    ...widthVariants,
    ...heightVariants,
    ...maxHeightVariants,
    ...minHeightVariants,
  },
})
