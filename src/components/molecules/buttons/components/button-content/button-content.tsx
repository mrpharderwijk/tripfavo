'use client'
import { VariantProps } from 'class-variance-authority'
import { MouseEvent, PropsWithChildren, ReactElement } from 'react'
import { IconType } from 'react-icons'

import { Avatar } from '@/components/atoms/avatar/avatar'
import { DotLoader } from '@/components/atoms/dot-loader/dot-loader'
import {
  buttonContentClassNames,
  buttonContentIconClassNames,
  buttonContentLabelClassNames,
} from '@/components/molecules/buttons/components/button-content/button-content.class-names'
export const TID_BUTTON_LOADER = 'button__loader'

export type ButtonContentProps = PropsWithChildren<
  VariantProps<typeof buttonContentClassNames> & {
    icon?: IconType
    loading?: boolean
    noPadding?: boolean
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
    outline?: boolean
    disabled?: boolean
  }
>

export function ButtonContent({
  children,
  avatar,
  variant,
  icon: Icon,
  size = 'lg',
  loading = false,
  disabled = false,
  underline = false,
}: ButtonContentProps): ReactElement {
  const wrapperClassNames = buttonContentClassNames({
    variant,
    disabled,
    withIcon: !!Icon,
  })
  const labelClassNames = buttonContentLabelClassNames({ variant, loading, underline })
  const iconClassNames = buttonContentIconClassNames({ size, variant, loading })

  return (
    <div className={wrapperClassNames}>
      {loading && (
        <div className="absolute top-2 w-full" data-testid={TID_BUTTON_LOADER}>
          <DotLoader size="sm" />
        </div>
      )}

      {!!avatar && <Avatar size={size} />}
      {!!Icon && <Icon className={iconClassNames} />}
      {!!children && <span className={labelClassNames}>{children}</span>}
    </div>
  )
}
