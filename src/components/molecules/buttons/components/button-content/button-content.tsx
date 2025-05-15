import { VariantProps } from 'class-variance-authority'
import { MouseEvent, PropsWithChildren, ReactElement } from 'react'
import { IconType } from 'react-icons'

import {
  buttonContentClassNames,
  buttonContentLabelClassNames,
} from '@/components/molecules/buttons/components/button-content/button-content.class-names'
import { cn } from '@/utils/class-names'

export const TID_BUTTON_LOADER = 'button__loader'

export type ButtonContentProps = PropsWithChildren<
  VariantProps<typeof buttonContentClassNames> & {
    icon?: IconType
    isLoading?: boolean
    noPadding?: boolean
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
    outline?: boolean
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    underline?: boolean
    disabled?: boolean
  }
>

export function ButtonContent({
  children,
  variant = 'gray',
  icon: Icon,
  isLoading,
  noPadding = false,
  size = 'md',
  rounded = false,
  underline = false,
  disabled = false,
}: ButtonContentProps): ReactElement {
  const iconOnly = Boolean(!children && Icon)
  const wrapperClassNames = buttonContentClassNames({
    noPadding,
    rounded,
    size,
    variant,
    iconOnly,
    disabled,
  })
  const labelClassNames = buttonContentLabelClassNames({ size, variant, underline })

  return (
    <div className={wrapperClassNames}>
      {isLoading && (
        <div className="absolute -top-[1px] h-1 w-full" data-testid={TID_BUTTON_LOADER}>
          <div className="relative h-full w-full bg-slate-50/20">
            <div className="absolute bottom-0 left-0 right-full top-0 h-1 w-9 animate-moveLeftToRight bg-cyan-300/70"></div>
          </div>
        </div>
      )}

      {Icon && (
        <Icon
          size={16}
          color="red"
          stroke="red"
          className={cn({
            'mr-1 flex-auto': !iconOnly,
            'stroke-black': variant === 'outline',
            'w-4 h-4 stroke-icon-secondary disabled:stroke-icon-secondary-disabled hover:stroke-icon-secondary-hover':
              iconOnly,
            'stroke-border-secondary-disabled hover:stroke-border-secondary-disabled':
              iconOnly && disabled,
            'stroke-white': variant === 'primary',
            'stroke-zinc-50 disabled:stroke-secondary-700': variant === 'secondary',
            'stroke-zinc-50 disabled:stroke-tertiary-700': variant === 'tertiary',
          })}
        />
      )}
      {!!children && <span className={labelClassNames}>{children}</span>}
    </div>
  )
}
