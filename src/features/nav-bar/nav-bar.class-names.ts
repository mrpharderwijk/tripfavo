import { cva } from 'class-variance-authority'

export const navBarClassNames = cva('bg-primary border-b border-deco bg-bg-primary', {
  variants: {
    fixed: {
      true: 'fixed w-full z-50 shadow-sm top-0 left-0 right-0',
      false: '',
    },
  },
})
