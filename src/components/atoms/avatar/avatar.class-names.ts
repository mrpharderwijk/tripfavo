import { cva } from 'class-variance-authority'

export const avatarClassNames = cva('rounded-full', {
  variants: {
    size: {
      xs: 'w-6 h-6',
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-12 h-12',
      xl: 'w-14 h-14',
    },
  },
})
