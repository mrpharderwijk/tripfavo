import { cva } from 'class-variance-authority'

import {
  alignContentVariants,
  alignItemsVariants,
  alignSelfVariants,
  borderColorVariants,
  borderStyleVariants,
  borderVariants,
  displayVariants,
  flexBasisVariants,
  flexDirectionVariants,
  flexVariants,
  flexWrapVariants,
  fullHeightVariants,
  fullWidthVariants,
  gapVariants,
  heightVariants,
  justifyContentVariants,
  orderVariants,
  widthVariants,
} from '@/utils/variants'
import { borderRadiusVariants } from '@/utils/variants/border/border-radius'
import { colEndVariants } from '@/utils/variants/grid/col-end'
import { colSpanVariants } from '@/utils/variants/grid/col-span'
import { colStartVariants } from '@/utils/variants/grid/col-start'
import { gridColsVariants } from '@/utils/variants/grid/grid-cols'
import { rowEndVariants } from '@/utils/variants/grid/row-end'
import { rowSpanVariants } from '@/utils/variants/grid/row-span'
import { rowStartVariants } from '@/utils/variants/grid/row-start'
import { maxHeightVariants } from '@/utils/variants/sizing/max-height'
import { minHeightVariants } from '@/utils/variants/sizing/min-height'

export const gridItemClassNames = cva('', {
  variants: {
    /**
     * Grid
     */
    ...gridColsVariants,
    ...colSpanVariants,
    ...colStartVariants,
    ...colEndVariants,
    ...rowSpanVariants,
    ...rowStartVariants,
    ...rowEndVariants,

    /**
     * Display
     */
    ...displayVariants,

    /**
     * Flexbox
     */
    ...flexDirectionVariants,
    ...flexWrapVariants,
    ...justifyContentVariants,
    ...alignItemsVariants,
    ...alignContentVariants,
    ...alignSelfVariants,
    ...flexVariants,
    ...orderVariants,
    ...gapVariants,
    ...flexBasisVariants,

    ...borderVariants,
    ...borderStyleVariants,
    ...borderColorVariants,
    ...borderRadiusVariants,
    ...heightVariants,
    ...widthVariants,
    ...fullHeightVariants,
    ...fullWidthVariants,
    ...maxHeightVariants,
    ...minHeightVariants,
  },
})
