import { cva } from 'class-variance-authority'

export const primaryButtonThemeClassNames =
  'bg-bg-primary hover:bg-bg-primary-hover focus:bg-bg-primary-hover focus-visible:bg-bg-primary-hover disabled:bg-bg-primary-disabled'
export const primaryInverseButtonThemeClassNames =
  'bg-bg-primary-inverse hover:bg-bg-primary-inverse-hover focus:bg-bg-primary-inverse-hover focus-visible:bg-bg-primary-inverse-hover disabled:bg-bg-primary-inverse-disabled'
export const primaryLinkButtonThemeClassNames =
  'bg-bg-primary disabled:bg-bg-primary-disabled'
export const secondaryButtonThemeClassNames =
  'bg-linear-to-r from-blue-700 to-purple-800'
export const tertiaryButtonThemeClassNames =
  'bg-bg-tertiary hover:bg-bg-tertiary-hover focus:bg-bg-tertiary-hover focus-visible:bg-bg-tertiary-hover disabled:bg-bg-tertiary-disabled'
export const quaternaryButtonThemeClassNames =
  'bg-bg-quaternary hover:bg-bg-quaternary-hover focus:bg-bg-quaternary-hover focus-visible:bg-bg-quaternary-hover disabled:bg-bg-quaternary-disabled'
export const quaternaryInverseButtonThemeClassNames =
  'bg-bg-primary hover:hover:bg-bg-quaternary-hover focus:hover:bg-bg-quaternary-hover focus-visible:hover:bg-bg-quaternary-hover disabled:bg-bg-quaternary-disabled'
export const outlineButtonThemeClassNames =
  'border-1 border-border-tertiary hover:border-border-tertiary-hover focus:border-border-tertiary-hover focus-visible:border-border-tertiary-hover disabled:border-border-secondary-disabled hover:disabled:border-border-secondary-disabled'
export const sidebarMenuItemButtonThemeClassNames =
  'xxxxxxxx bg-bg-secondary hover:bg-bg-secondary focus:bg-bg-secondary focus-visible:bg-bg-secondary disabled:bg-bg-primary-disabled'
export const sidebarMenuItemActiveButtonThemeClassNames =
  'bg-bg-quaternary hover:bg-bg-primary focus:bg-bg-primary focus-visible:bg-bg-primary disabled:bg-bg-quaternary-disabled'

type ButtonVariant =
  | 'primary'
  | 'primary-inverse'
  | 'primary-link'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'quaternary-inverse'
  | 'outline'
export const buttonVariants = [
  'primary',
  'primary-inverse',
  'primary-link',
  'secondary',
  'tertiary',
  'quaternary',
  'quaternary-inverse',
  'outline',
  'sidebar-menu-item',
  'sidebar-menu-item-active',
] as ButtonVariant[]

export const buttonClassNames = cva('box-border transition-all duration-300', {
  variants: {
    variant: {
      primary: primaryButtonThemeClassNames,
      'primary-inverse': primaryInverseButtonThemeClassNames,
      'primary-link': primaryLinkButtonThemeClassNames,
      secondary: secondaryButtonThemeClassNames,
      tertiary: tertiaryButtonThemeClassNames,
      quaternary: quaternaryButtonThemeClassNames,
      'quaternary-inverse': quaternaryInverseButtonThemeClassNames,
      outline: outlineButtonThemeClassNames,
      'sidebar-menu-item': sidebarMenuItemButtonThemeClassNames,
      'sidebar-menu-item-active': sidebarMenuItemActiveButtonThemeClassNames,
    },
    size: {
      xs: ['h-6', 'text-base-xs'], // 24px
      sm: ['h-[34px]', 'text-base-sm'], // 34px
      md: ['h-10', 'text-base-md'], // 40px
      lg: ['h-12', 'text-base-lg'], // 48px
      xl: ['h-12 md:h-14', 'text-base-md md:text-base-xl'], // 56px
    },
    avatar: {
      true: 'rounded-full',
      false: '',
    },
    fullWidth: {
      true: '',
      false: '',
    },
    underline: {
      true: '',
      false: '',
    },
    iconOnly: {
      true: 'px-0 py-0 p-0',
    },
    rounded: {
      true: 'rounded-full',
      false: '',
      xs: 'rounded-xs',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
    },
    disabled: {
      true: 'cursor-not-allowed',
      false: 'cursor-pointer',
    },
    loading: {
      true: 'cursor-not-allowed hover:cursor-not-allowed',
      false: '',
    },
  },
  compoundVariants: [
    // FONT WEIGHT
    {
      size: ['xs', 'sm', 'md', 'lg', 'xl'],
      class: 'font-semibold',
    },

    // PADDING
    {
      variant: buttonVariants.filter((v) => v !== 'primary-link'),
      size: 'xs',
      avatar: false,
      iconOnly: false,
      rounded: false,
      class: 'px-3 py-1',
    },
    {
      variant: buttonVariants.filter((v) => v !== 'primary-link'),
      size: 'sm',
      avatar: false,
      iconOnly: false,
      rounded: false,
      class: 'px-4 py-2',
    },
    {
      variant: buttonVariants.filter((v) => v !== 'primary-link'),
      size: 'md',
      avatar: false,
      iconOnly: false,
      rounded: false,
      class: 'px-3 py-2.5',
    },
    {
      variant: buttonVariants.filter((v) => v !== 'primary-link'),
      size: 'lg',
      avatar: false,
      iconOnly: false,
      rounded: false,
      class: 'px-6 py-3.5',
    },
    {
      variant: buttonVariants.filter((v) => v !== 'primary-link'),
      size: 'xl',
      avatar: false,
      iconOnly: false,
      rounded: false,
      class: 'px-6 py-4 md:px-8 md:py-4',
    },
    {
      variant: buttonVariants.filter((v) => v !== 'primary-link'),
      loading: true,
      class:
        'cursor-not-allowed bg-bg-tertiary-disabled/60 hover:bg-bg-tertiary-disabled/60',
    },

    {
      variant: buttonVariants.filter((v) => v.includes('sidebar-menu-item')),
      avatar: false,
      iconOnly: false,
      class: 'p-4 w-full rounded-xl h-14 text-base-lg',
    },

    // PADDING + ROUNDED
    {
      variant: buttonVariants.filter((v) => v !== 'primary-link'),
      size: 'xs',
      avatar: false,
      iconOnly: false,
      rounded: true,
      class: 'px-3 py-1.5',
    },
    {
      variant: buttonVariants.filter((v) => v !== 'primary-link'),
      size: 'sm',
      avatar: false,
      iconOnly: false,
      rounded: true,
      class: 'px-4 py-[9px]',
    },
    {
      variant: buttonVariants.filter((v) => v !== 'primary-link'),
      size: 'md',
      avatar: false,
      iconOnly: false,
      rounded: true,
      class: 'px-5 py-2.5',
    },
    {
      variant: buttonVariants.filter((v) => v !== 'primary-link'),
      size: 'lg',
      avatar: false,
      iconOnly: false,
      rounded: true,
      class: 'px-6 py-3.5',
    },
    {
      variant: buttonVariants.filter((v) => v !== 'primary-link'),
      size: 'xl',
      avatar: false,
      iconOnly: false,
      rounded: true,
      class: 'px-8 py-4',
    },

    // ROUNDED DEFAULT
    {
      variant: buttonVariants.filter(
        (v) =>
          ![
            'primary-link',
            'sidebar-menu-item',
            'sidebar-menu-item-active',
          ].includes(v),
      ),
      rounded: false,
      class: 'rounded-sm',
    },

    // ROUNDED AVATAR
    {
      variant: buttonVariants.filter((v) => v !== 'primary-link'),
      avatar: true,
      rounded: true,
      class: 'px-0 py-0',
    },

    // ICON ONLY
    {
      size: 'xs',
      iconOnly: true,
      class: 'w-6',
    },
    {
      size: 'sm',
      iconOnly: true,
      class: 'w-[34px]',
    },
    {
      size: 'md',
      iconOnly: true,
      class: 'w-10',
    },
    {
      size: 'lg',
      iconOnly: true,
      class: 'w-12',
    },
    {
      size: 'xl',
      iconOnly: true,
      class: 'w-14',
    },

    // AVATAR
    {
      size: 'xs',
      avatar: true,
      class: 'w-6',
    },
    {
      size: 'sm',
      avatar: true,
      class: 'w-[34px]',
    },
    {
      size: 'md',
      avatar: true,
      class: 'w-10',
    },
    {
      size: 'lg',
      avatar: true,
      class: 'w-12',
    },
    {
      size: 'xl',
      avatar: true,
      class: 'w-14',
    },

    // FONT COLOR
    {
      variant: ['primary-inverse', 'secondary'],
      class: 'text-text-primary-inverse',
    },

    {
      variant: ['primary', 'primary-link', 'tertiary', 'outline'],
      class: 'text-text-primary',
    },

    // SIZE
    {
      variant: ['primary-link'],
      class: 'h-auto w-auto rounded-xs',
    },
    {
      variant: buttonVariants.filter((v) => v !== 'primary-link'),
      fullWidth: true,
      class: 'w-full',
    },
  ],
})
