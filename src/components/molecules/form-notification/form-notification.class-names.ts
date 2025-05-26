import { cva } from 'class-variance-authority'

export const formNotificationClassNames = cva('w-full border-l', {
  variants: {
    variant: {
      danger: 'border-red-700 bg-red-500',
      warning: 'border-orange-700 bg-orange-500',
      success: 'border-green-700 bg-green-500',
      info: 'border-blue-700 bg-blue-500',
    },
  },
})
