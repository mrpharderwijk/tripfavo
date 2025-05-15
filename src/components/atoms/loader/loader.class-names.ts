import { cva } from 'class-variance-authority'

export const loaderVariants = {
  size: {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  },
} as const

export const loaderClassNames = cva(
  'absolute top-0 left-0 right-0 bottom-0 m-auto border-4 border-transparent border-t-white rounded-full animate-spin',
  {
    variants: loaderVariants,
    defaultVariants: {
      size: 'md',
    },
  },
)
