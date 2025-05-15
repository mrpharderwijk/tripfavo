import { MouseEvent, PropsWithChildren, ReactElement, Ref } from 'react'

import { ButtonContent, ButtonContentProps } from './components/button-content/button-content'

import { cn } from '@/utils/class-names'

type ButtonProps = PropsWithChildren<
  {
    disabled?: boolean
    fullWidth?: boolean
    forwardRef?: Ref<HTMLButtonElement>
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
    type?: 'submit' | 'button'
  } & ButtonContentProps
>

export function Button({
  children,
  disabled = false,
  forwardRef,
  fullWidth = false,
  icon: Icon,
  isLoading = false,
  onClick = (): void => {
    return
  },
  type = 'button',
  size = 'md',
  ...rest
}: ButtonProps): ReactElement {
  const iconOnly = Boolean(!children && Icon)
  const buttonClassNames = cn({
    'w-full': fullWidth,
    'rounded-full': rest.rounded || iconOnly,
    rounded: !rest.rounded && ['xs', 'sm'].includes(size),
    'rounded-md': !rest.rounded && ['md', 'xl', 'lg'].includes(size),
    'cursor-not-allowed': disabled,
  })

  return (
    <button
      className={buttonClassNames}
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      ref={forwardRef}
    >
      <ButtonContent icon={Icon} isLoading={isLoading} disabled={disabled} size={size} {...rest}>
        {children}
      </ButtonContent>
    </button>
  )
}
