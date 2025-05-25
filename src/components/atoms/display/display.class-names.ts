import { cva } from 'class-variance-authority'

export const displayClassNames = cva('', {
  variants: {
    show: {
      true: 'block',
      false: 'hidden',
    },
    'show-xs': {
      true: 'xs:block',
      false: 'xs:hidden',
    },
    'show-md': {
      true: 'md:block',
      false: 'md:hidden',
    },
    'show-lg': {
      true: 'lg:block',
      false: 'lg:hidden',
    },
    'show-xl': {
      true: 'xl:block',
      false: 'xl:hidden',
    },
    'show-2xl': {
      true: '2xl:block',
      false: '2xl:hidden',
    },

    'show-3xl': {
      true: '3xl:block',
      false: '3xl:hidden',
    },
  },
})
