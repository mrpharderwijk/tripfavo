import { cva } from 'class-variance-authority'

export const primaryButtonThemeClassNames = 'bg-bg-primary hover:bg-bg-primary-hover'
export const primaryInverseButtonThemeClassNames =
  'bg-bg-primary-inverse hover:bg-bg-primary-inverse-hover'
export const secondaryButtonThemeClassNames =
  'bg-linear-to-r from-blue-700 to-purple-800 text-text-primary-inverse'
export const tertiaryButtonThemeClassNames =
  'bg-tertiary-600 border-tertiary-600 hover:bg-tertiary-500 hover:border-tertiary-500 active:bg-tertiary-700 active:border-tertiary-700 disabled:bg-tertiary-200 disabled:border-tertiary-200'
export const grayButtonThemeClassNames = 'bg-neutral-200/50 hover:bg-neutral-200/30'
export const grayHoverButtonThemeClassNames =
  'bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-700'
export const outlineButtonThemeClassNames =
  'border-1 bg-white border-border-tertiary hover:border-border-tertiary-hover'
export const ghostButtonThemeClassNames = 'bg-transparent hover:bg-bg-primary-hover'

export const buttonContentClassNames = cva(
  'box-border relative flex flex-row items-center justify-center overflow-hidden transition-all duration-300 outline-black',
  {
    variants: {
      variant: {
        primary: ['text-white', primaryButtonThemeClassNames],
        'primary-inverse': ['text-white', primaryInverseButtonThemeClassNames],
        'primary-link': ['text-white'],
        secondary: 'text-primary-inverse bg-linear-to-r from-blue-700 to-purple-800',
        tertiary: ['text-zinc-50 disabled:text-tertiary-700', tertiaryButtonThemeClassNames],
        gray: [grayButtonThemeClassNames],
        'gray-link': [],
        'gray-hover': [grayHoverButtonThemeClassNames],
        outline: ['text-text-black', outlineButtonThemeClassNames],
        ghost: [ghostButtonThemeClassNames],
      },

      size: {
        xs: ['px-2 py-1', 'rounded'],
        sm: ['px-[10px] py-[10px]', 'rounded'],
        md: ['h-10', 'px-4', 'rounded-md'],
        lg: ['px-[10px] py-[10px]', 'rounded-md'],
        xl: ['px-8 py-3.5', 'rounded-md'],
      },

      noPadding: {
        true: ['p-0'],
      },

      rounded: {
        true: ['rounded-full'],
      },

      underline: {
        true: ['underline'],
      },

      loading: {
        true: '',
        false: '',
      },

      iconOnly: {
        true: '',
        false: '',
      },
      disabled: {
        true: 'cursor-not-allowed',
        false: 'cursor-pointer',
      },
    },
    compoundVariants: [
      {
        variant: 'primary',
        loading: true,
        class: 'bg-primary-disabled',
      },
      {
        variant: 'primary-inverse',
        loading: true,
        class: 'bg-primary-inverse-disabled',
      },
      {
        variant: 'secondary',
        loading: true,
        class: 'bg-secondary-disabled',
      },
      {
        variant: 'outline',
        iconOnly: true,
        disabled: false,
        class:
          'p-0 h-8 w-8 border-border-secondary disabled:border-border-secondary-disabled hover:border-border-secondary-hover',
      },
      {
        variant: 'outline',
        iconOnly: true,
        disabled: true,
        class:
          'p-0 h-8 w-8 border-border-secondary-disabled hover:border-border-secondary-disabled',
      },
    ],
  },
)

export const buttonContentLabelClassNames = cva('flex-initial', {
  variants: {
    underline: {
      true: ['underline decoration-[1px]'],
    },
    size: {
      xs: 'text-xs font-semibold tracking-wide',
      sm: 'text-sm font-semibold tracking-wide',
      md: 'text-sm font-semibold tracking-wide',
      lg: 'text-base-lg font-semibold',
      xl: 'text-base-lg font-semibold',
    },
    variant: {
      primary: 'text-text-primary-inverse',
      'primary-inverse': 'text-text-primary-inverse',
      'primary-link': 'text-text-primary-inverse',
      secondary: 'text-text-primary-inverse',
      tertiary: 'text-text-primary-inverse',
      gray: 'text-text-primary-inverse',
      'gray-link': 'text-text-primary-inverse',
      'gray-hover': 'text-text-primary-inverse',
      outline: 'text-text-black',
      ghost: 'text-text-primary-inverse',
    },
  },
})
