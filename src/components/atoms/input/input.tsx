import { AlertCircle } from 'lucide-react'
import { ChangeEvent, forwardRef, InputHTMLAttributes, ReactElement, useState } from 'react'

import { Box } from '@/components/atoms/layout/box/box'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { cn } from '@/utils/class-names'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string
  label: string
  formatPrice?: boolean
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, placeholder, value, error, onChange, id, disabled, ...props }, ref): ReactElement => {
    const [isFocused, setIsFocused] = useState(false)
    const errorId = `${id}-error`
    const isFloating = isFocused || !!value || !!error
    const hasError = !!error
    const inputClassName = cn(
      'w-full h-14 px-4 pt-5 pb-1 border border-grey-600 rounded-lg transition-all duration-200 text-base-lg font-medium text-text-primary outline-offset-2 outline-black',
      {
        'border-border-secondary-error outline-1 !outline-border-secondary-error':
          hasError && isFocused,
        'border-border-secondary-error bg-bg-primary-error outline-black': hasError && !isFocused,
        'bg-bg-primary-disabled cursor-not-allowed': !!disabled,
      },
    )
    const labelClassName = cn(
      'absolute pointer-events-none transition-all duration-200 font-medium',
      {
        'text-xs top-2 left-4 text-text-secondary': isFloating,
        'text-text-primary-error font-bold': hasError,
        'text-base-lg top-1/2 -translate-y-1/2 left-4 text-text-secondary': !isFloating,
      },
    )

    function handleFocus(): void {
      setIsFocused(true)
    }

    function handleBlur(): void {
      setIsFocused(false)
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
      onChange?.(e)
    }

    return (
      <FlexBox flex-direction="col" gap={2}>
        <Box position="relative">
          <label htmlFor={id} className={labelClassName}>
            {label}
          </label>
          <input
            {...props}
            id={id}
            ref={ref}
            value={value}
            placeholder={isFloating ? placeholder : ''}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : undefined}
            className={inputClassName}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </Box>

        {error && (
          <FlexBox flex-direction="row" align-items="center" justify-content="start" gap={1}>
            <div id={errorId} className="text-xs text-text-primary-error" role="alert">
              <AlertCircle size={16} />
            </div>
            <div className="text-xs text-text-primary-error">{error}</div>
          </FlexBox>
        )}
      </FlexBox>
    )
  },
)

Input.displayName = 'Input'
