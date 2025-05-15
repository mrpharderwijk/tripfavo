import { VariantProps } from 'class-variance-authority'
import { ReactElement } from 'react'
import { IconType } from 'react-icons'

import { buttonUiClassNames } from '@/components/molecules/buttons/button-ui/button-ui.class-names'
import { PropsWithTestId } from '@/types'
import { cn } from '@/utils/class-names'

type ButtonUiProps = PropsWithTestId<
  VariantProps<typeof buttonUiClassNames> & {
    icon: IconType
    iconSize?: VariantProps<typeof buttonUiClassNames>['size']
    onClick?: () => void
    screenReaderText?: string
    type?: 'button' | 'submit'
  }
>

const iconSizeMap = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
}

export function ButtonUi({
  'data-testid': dataTestid,
  icon: Icon,
  onClick,
  screenReaderText,
  type = 'button',
  ...buttonUiProps
}: ButtonUiProps): ReactElement {
  const iconSize = buttonUiProps.iconSize ?? buttonUiProps.size ?? 'lg'
  const buttonUiClassName = cn(buttonUiClassNames({ ...buttonUiProps }))

  return (
    <button
      className={buttonUiClassName}
      type={type}
      onClick={onClick}
      data-testid={dataTestid}
    >
      {!!screenReaderText && (
        <span className="sr-only">{screenReaderText}</span>
      )}
      {Icon && <Icon size={iconSizeMap[iconSize]} aria-hidden="true" />}
    </button>
  )
}
