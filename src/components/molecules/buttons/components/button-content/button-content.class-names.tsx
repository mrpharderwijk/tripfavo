import { cva } from 'class-variance-authority'

/**
 * Button sizes
 * 4xs - 24px
 * 3xs - 28px
 * 2xs - 30px
 * xs - 32px
 * sm - 34px
 * md - 40px
 * lg - 48px
 * xl - 56px
 */
export const buttonContentClassNames = cva(
  'box-border relative flex flex-row items-center justify-center',
  {
    variants: {
      variant: {
        primary: '',
        'primary-inverse': '',
        'primary-link': '',
        secondary: '',
        tertiary: '',
        quaternary: '',
        'quaternary-inverse': '',
        outline: '',
        'sidebar-menu-item': 'gap-4 justify-start',
        'sidebar-menu-item-active': 'gap-4 justify-start',
      },

      avatar: {
        true: '',
        false: '',
      },

      size: {
        xs: '',
        sm: '',
        md: '',
        lg: '',
        xl: '',
      },

      disabled: {
        true: '',
        false: '',
      },

      loading: {
        true: '',
        false: '',
      },

      withIcon: {
        true: 'gap-2',
        false: 'gap-0',
      },

      underline: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      // DISABLED
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
    ],
  },
)

export const buttonContentLabelClassNames = cva('flex-initial', {
  variants: {
    variant: {
      primary: '',
      'primary-inverse': '',
      'primary-link': 'underline decoration-1',
      secondary: '',
      tertiary: '',
      quaternary: '',
      'quaternary-inverse': '',
      outline: '',
      'sidebar-menu-item': 'font-medium',
      'sidebar-menu-item-active': 'font-semibold',
    },
    avatar: {
      true: 'rounded-full w-10 h-10',
      false: '',
    },
    size: {
      xs: '',
      sm: '',
      md: '',
      lg: '',
      xl: '',
    },
    loading: {
      true: 'invisible',
      false: 'visible',
    },
    underline: {
      true: 'underline underline-offset-1 decoration-1',
      false: '',
    },
  },
  compoundVariants: [
    {
      variant: 'primary-link',
      size: ['xs', 'sm', 'md', 'lg', 'xl'],
      class: 'underline-offset-2',
    },
  ],
})

export const buttonContentIconClassNames = cva('', {
  variants: {
    size: {
      xs: 'w-4 h-4',
      sm: 'w-4 h-4',
      md: 'w-4 h-4',
      lg: 'w-5 h-5',
      xl: 'w-6 h-6',
    },
    variant: {
      primary: '',
      'primary-inverse': '',
      'primary-link': '',
      secondary: '',
      tertiary: '',
      quaternary: '',
      'quaternary-inverse': '',
      outline: '',
      'sidebar-menu-item': '',
      'sidebar-menu-item-active': '',
    },
    loading: {
      true: 'invisible',
      false: 'visible',
    },
  },
})
