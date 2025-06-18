import { VariantProps } from 'class-variance-authority'
import { MouseEvent, PropsWithChildren, ReactElement, Ref } from 'react'
import { IconType } from 'react-icons'

import { ButtonContent } from '../components/button-content/button-content'

import { buttonClassNames } from '@/components/molecules/buttons/button.class-names'
import { PropsWithTestId } from '@/types'
import { cn } from '@/utils/class-names'

type ButtonWrapperProps = PropsWithChildren<
  {
    renderRoot: ({
      buttonContent,
    }: {
      buttonContent: ReactElement
    }) => ReactElement
  } & PropsWithTestId<
    {
      fullWidth?: boolean
      icon?: IconType
      ref?: Ref<HTMLDivElement>
      onClick?: (e: MouseEvent<HTMLDivElement>) => void
    } & Omit<VariantProps<typeof buttonClassNames>, 'iconOnly'>
  >
>

export function ButtonWrapper({
  renderRoot,
  avatar = false,
  children,
  'data-testid': dataTestId,
  disabled = false,
  ref,
  fullWidth = false,
  icon: Icon,
  loading = false,
  rounded = false,
  size = 'md',
  variant = 'primary',
  onClick,
  ...rest
}: ButtonWrapperProps): ReactElement {
  const iconOnly = Boolean(!children && Icon)
  const isRounded = rounded || iconOnly || avatar
  const buttonWrapperClassName = cn(
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

  return renderRoot({
    buttonContent: (
      <div
        className={buttonWrapperClassName}
        ref={ref}
        data-testid={dataTestId}
        onClick={onClick}
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
      </div>
    ),
  })
}
