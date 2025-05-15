import { cva } from 'class-variance-authority'

import { backgroundColorVariants } from '@/utils/variants/background'
import { borderColorVariants, borderStyleVariants, borderVariants } from '@/utils/variants/border'
import { borderRadiusVariants } from '@/utils/variants/border/border-radius'
import { displayVariants } from '@/utils/variants/display'
import {
  alignContentVariants,
  alignItemsVariants,
  alignSelfVariants,
  flexBasisVariants,
  flexDirectionVariants,
  flexVariants,
  flexWrapVariants,
  gapVariants,
  justifyContentVariants,
  orderVariants,
} from '@/utils/variants/flex-box'
import { placeItemsVariants } from '@/utils/variants/flex-box/place-items'
import { marginVariants } from '@/utils/variants/margin'
import { opacityVariants } from '@/utils/variants/opacity'
import { overflowVariants } from '@/utils/variants/overflow'
import { paddingVariants } from '@/utils/variants/padding'
import {
  bottomVariants,
  floatVariants,
  leftVariants,
  positionVariants,
  rightVariants,
  topVariants,
  zIndexVariants,
} from '@/utils/variants/position'
import { snapVariants } from '@/utils/variants/position/snap'
import { snapAlignVariants } from '@/utils/variants/position/snap-align'
import { snapTypeVariants } from '@/utils/variants/position/snap-type'
import { heightVariants, maxWidthVariants, widthVariants } from '@/utils/variants/sizing'
import { minWidthVariants } from '@/utils/variants/sizing/min-width'

export const boxClassnames = cva('', {
  variants: {
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
    ...placeItemsVariants,

    /**
     * Spacing
     */
    ...marginVariants,
    ...paddingVariants,

    /**
     * Positioning
     */
    ...positionVariants,
    ...topVariants,
    ...rightVariants,
    ...leftVariants,
    ...bottomVariants,
    ...zIndexVariants,
    ...overflowVariants,
    ...floatVariants,
    ...snapVariants,
    ...snapTypeVariants,
    ...snapAlignVariants,

    /**
     * Sizing
     */
    ...heightVariants,
    ...widthVariants,
    ...maxWidthVariants,
    ...minWidthVariants,

    ...borderVariants,
    ...borderStyleVariants,
    ...borderColorVariants,
    ...borderRadiusVariants,

    ...opacityVariants,

    ...backgroundColorVariants,

    spread: {
      true: 'left-0 right-0 top-0 bottom-0',
      false: null,
    },

    container: {
      true: 'container',
      false: null,
    },
  },
  defaultVariants: {
    position: 'relative',
  },
})
