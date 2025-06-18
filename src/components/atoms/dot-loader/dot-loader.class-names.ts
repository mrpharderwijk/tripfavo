import { cva } from 'class-variance-authority'

export const dotLoaderWrapperClassNames = cva(
  'flex items-center justify-center',
  {
    variants: {
      size: {
        sm: 'gap-1',
        md: 'gap-2',
        lg: 'gap-3',
      },
    },
  },
)

export const dotLoaderClassNames = cva('rounded-full animate-dot-loader', {
  variants: {
    color: {
      black: 'bg-black',
    },
    size: {
      sm: 'w-1.5 h-1.5',
      md: 'w-2.5 h-2.5',
      lg: 'w-3.5 h-3.5',
    },
  },
})
