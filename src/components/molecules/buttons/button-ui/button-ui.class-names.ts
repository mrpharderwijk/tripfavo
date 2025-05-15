import { cva } from 'class-variance-authority'

import {
  grayButtonThemeClassNames,
  grayHoverButtonThemeClassNames,
  primaryButtonThemeClassNames,
  tertiaryButtonThemeClassNames,
} from '@/components/molecules/buttons/components/button-content/button-content.class-names'

export const buttonUiClassNames = cva(
  'flex items-center justify-center rounded-md',
  {
    variants: {
      size: {
        xs: ['p-1'],
        sm: ['p-2'],
        md: ['p-2'],
        lg: ['h-12 w-12 p-3'],
      },
      variant: {
        primary: ['text-white', primaryButtonThemeClassNames],
        secondary: ['text-white', primaryButtonThemeClassNames],
        tertiary: ['text-white', tertiaryButtonThemeClassNames],
        gray: ['text-text-black', grayButtonThemeClassNames],
        grayHover: ['text-text-black', grayHoverButtonThemeClassNames],
        transparent: [' text-text-black', 'bg-transparent'],
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'gray',
    },
  },
)
