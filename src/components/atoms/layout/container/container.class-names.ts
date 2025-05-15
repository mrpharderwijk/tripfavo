import { cva } from 'class-variance-authority'

import { backgroundColorVariants } from '@/utils/variants'

export const containerClassNames = cva('mx-auto', {
  variants: {
    ...backgroundColorVariants,
    padding: {
      true: 'px-6 md:px-10 lg:px-10 xl:px-20',
      false: undefined,
    },
    fullWidth: {
      true: 'w-full',
      false: 'max-w[2520px] w-full',
    },
    narrow: {
      sm: 'max-w-[568px]',
      md: 'max-w-[623px]',
    },
  },
  defaultVariants: {
    fullWidth: false,
  },
})
