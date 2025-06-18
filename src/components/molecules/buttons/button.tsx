'use client'

import { VariantProps } from 'class-variance-authority'
import {
  HtmlHTMLAttributes,
  MouseEvent,
  PropsWithChildren,
  ReactElement,
  Ref,
} from 'react'
import { IconType } from 'react-icons'

import { ButtonContent } from './components/button-content/button-content'

import { buttonClassNames } from '@/components/molecules/buttons/button.class-names'
import { PropsWithTestId } from '@/types'
import { cn } from '@/utils/class-names'

export type ButtonProps = PropsWithChildren<
  PropsWithTestId<
    {
      fullWidth?: boolean
      icon?: IconType
      ref?: Ref<HTMLButtonElement>
      onClick?: (e: MouseEvent<HTMLButtonElement>) => void
      type?: 'submit' | 'button'
    } & Omit<VariantProps<typeof buttonClassNames>, 'iconOnly'> &
      Omit<HtmlHTMLAttributes<HTMLButtonElement>, 'className' | 'size'>
  >
>

export function Button({
  avatar = false,
  children,
  'data-testid': dataTestId,
  disabled = false,
  ref,
  fullWidth = false,
  icon: Icon,
  loading = false,
  onClick = (): void => {
    return
  },
  type = 'button',
  rounded = false,
  size = 'md',
  variant = 'primary',
  ...rest
}: ButtonProps): ReactElement {
  const iconOnly = Boolean(!children && (Icon || avatar))
  const isRounded = rounded || iconOnly || avatar
  const buttonClassName = cn(
    buttonClassNames({
      avatar,
      variant,
      fullWidth,
      rounded: isRounded,
      disabled,
      loading,
      size,
      iconOnly,
    }),
  )

  if (variant === 'primary-link' && iconOnly) {
    throw new Error('primary-link button is not supported with icon only!')
  }

  if (avatar && variant !== 'primary') {
    throw new Error('avatar is not supported with variants other than primary!')
  }

  function handleOnClick(e: MouseEvent<HTMLButtonElement>): void {
    if (type === 'submit') {
      if (disabled || loading) {
        e.preventDefault()
        return
      }
      onClick?.(e)
      return
    }

    if (disabled || loading) {
      e.preventDefault()
      e.stopPropagation()
      return
    }

    onClick(e)
  }

  return (
    <button
      className={buttonClassName}
      type={type}
      onClick={handleOnClick}
      disabled={(disabled || loading) as boolean}
      ref={ref}
      data-testid={dataTestId}
    >
      <ButtonContent
        avatar={avatar}
        icon={Icon}
        loading={loading as boolean}
        disabled={disabled as boolean}
        variant={variant}
        size={size}
        {...rest}
      >
        {children}
      </ButtonContent>
    </button>
  )
}
