import { cva } from 'class-variance-authority'

import { displayVariants } from '@/utils/variants'
import { alignContentVariants } from '@/utils/variants/flex-box/align-content'
import { alignItemsVariants } from '@/utils/variants/flex-box/align-items'
import { alignSelfVariants } from '@/utils/variants/flex-box/align-self'
import { flexVariants } from '@/utils/variants/flex-box/flex'
import { flexBasisVariants } from '@/utils/variants/flex-box/flex-basis'
import { flexDirectionVariants } from '@/utils/variants/flex-box/flex-direction'
import { flexWrapVariants } from '@/utils/variants/flex-box/flex-wrap'
import { gapVariants } from '@/utils/variants/flex-box/gap'
import { justifyContentVariants } from '@/utils/variants/flex-box/justify-content'
import { orderVariants } from '@/utils/variants/flex-box/order'
import { marginVariants } from '@/utils/variants/margin/margin'
import { paddingVariants } from '@/utils/variants/padding/padding'
import { positionVariants } from '@/utils/variants/position/position'
import { fullHeightVariants, heightVariants } from '@/utils/variants/sizing/height'
import { maxHeightVariants } from '@/utils/variants/sizing/max-height'
import { maxWidthVariants } from '@/utils/variants/sizing/max-width'
import { minHeightVariants } from '@/utils/variants/sizing/min-height'
import { minWidthVariants } from '@/utils/variants/sizing/min-width'
import { fullWidthVariants, widthVariants } from '@/utils/variants/sizing/width'

export const flexBoxItemClassNames = cva('', {
  variants: {
    ...displayVariants,
    ...flexWrapVariants,
    ...flexDirectionVariants,
    ...gapVariants,
    ...alignContentVariants,
    ...alignItemsVariants,
    ...justifyContentVariants,
    ...marginVariants,

    // flex.item specific
    ...flexVariants,
    ...alignSelfVariants,
    ...orderVariants,
    ...positionVariants,
    ...paddingVariants,
    ...flexBasisVariants,

    ...widthVariants,
    ...heightVariants,
    ...fullHeightVariants,
    ...fullWidthVariants,
    ...minHeightVariants,
    ...minWidthVariants,
    ...maxHeightVariants,
    ...maxWidthVariants,
  },
})
