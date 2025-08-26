import { cva } from 'class-variance-authority'

import { backgroundColorVariants, fullHeightVariants } from '@/utils/variants'

export const containerClassNames = cva('mx-auto', {
  variants: {
    ...backgroundColorVariants,
    padding: {
      true: 'px-4 sm:px-6 md:px-10 lg:px-10 xl:px-20',
      false: undefined,
    },
    fullWidth: {
      true: 'w-full',
      false: 'max-w-[2520px] w-full',
    },
    ...fullHeightVariants,
    narrow: {
      sm: 'max-w-[568px] px-4',
      md: 'max-w-[623px] px-4',
      lg: 'max-w-[1280px]',
    },
    center: {
      true: 'flex justify-center',
      false: undefined,
    },
  },
  defaultVariants: {
    fullWidth: false,
  },
})
