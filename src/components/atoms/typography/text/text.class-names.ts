import { cva } from 'class-variance-authority'

import {
  fontSizeVariants,
  fontWeightVariants,
  letterSpacingVariants,
  lineClampVariants,
  lineHeightVariants,
  paddingVariants,
  textAlignVariants,
  textDecorationVariants,
  textIndentVariants,
  textOverflowVariants,
  textTransformVariants,
  textWrapVariants,
  verticalAlignVariants,
  whiteSpaceVariants,
} from '@/utils/variants'
import { textColorVariants } from '@/utils/variants/typography/text-color'

export const textClassNames = cva('underline-offset-1 decoration-1', {
  variants: {
    ...fontSizeVariants,
    ...fontWeightVariants,
    ...letterSpacingVariants,
    ...lineClampVariants,
    ...lineHeightVariants,
    ...textAlignVariants,
    ...textColorVariants,
    ...textDecorationVariants,
    ...textIndentVariants,
    ...textOverflowVariants,
    ...textTransformVariants,
    ...textWrapVariants,
    ...verticalAlignVariants,
    ...whiteSpaceVariants,
    ...paddingVariants,
  },
})
