import { cva } from 'class-variance-authority'

import {
  backgroundColorVariants,
  borderColorVariants,
  borderVariants,
  bottomVariants,
  fullHeightVariants,
  fullWidthVariants,
  heightVariants,
  leftVariants,
  maxWidthVariants,
  overflowVariants,
  rightVariants,
  topVariants,
  widthVariants,
} from '@/utils/variants'
import { borderRadiusVariants } from '@/utils/variants/border/border-radius'
import { alignContentVariants } from '@/utils/variants/flex-box/align-content'
import { alignItemsVariants } from '@/utils/variants/flex-box/align-items'
import { flexDirectionVariants } from '@/utils/variants/flex-box/flex-direction'
import { flexWrapVariants } from '@/utils/variants/flex-box/flex-wrap'
import { gapVariants } from '@/utils/variants/flex-box/gap'
import { justifyContentVariants } from '@/utils/variants/flex-box/justify-content'
import { marginVariants } from '@/utils/variants/margin/margin'
import { outlineColorVariants } from '@/utils/variants/outline/outline-color'
import { outlineOffsetVariants } from '@/utils/variants/outline/outline-offset'
import { outlineWidthVariants } from '@/utils/variants/outline/outline-width'
import { paddingVariants } from '@/utils/variants/padding/padding'
import { positionVariants } from '@/utils/variants/position/position'
import { maxHeightVariants } from '@/utils/variants/sizing/max-height'
import { minHeightVariants } from '@/utils/variants/sizing/min-height'
import { minWidthVariants } from '@/utils/variants/sizing/min-width'

export const flexBoxClassNames = cva('', {
  variants: {
    ...flexWrapVariants,
    ...flexDirectionVariants,
    ...gapVariants,
    ...alignContentVariants,
    ...alignItemsVariants,
    ...justifyContentVariants,
    ...positionVariants,
    ...paddingVariants,
    ...marginVariants,
    ...borderColorVariants,
    ...borderRadiusVariants,
    ...borderVariants,
    ...outlineWidthVariants,
    ...outlineColorVariants,
    ...outlineOffsetVariants,
    ...widthVariants,
    ...backgroundColorVariants,
    ...fullHeightVariants,
    ...fullWidthVariants,
    ...heightVariants,
    ...minHeightVariants,
    ...maxHeightVariants,
    ...minWidthVariants,
    ...maxWidthVariants,
    ...rightVariants,
    ...leftVariants,
    ...bottomVariants,
    ...topVariants,
    ...overflowVariants,
  },
})
