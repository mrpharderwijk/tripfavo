import { VariantProps } from 'class-variance-authority'
import { AlertCircle } from 'lucide-react'
import { ChangeEvent, ReactElement, TextareaHTMLAttributes, useState } from 'react'

import { textAreaClassNames } from '@/components/atoms/forms/text-area/text-area.class-names'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { WithRef } from '@/types/with-ref'
import { cn } from '@/utils/class-names'

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  WithRef<HTMLTextAreaElement> &
  VariantProps<typeof textAreaClassNames> & {
    id: string
    label: string
    error?: string
    charCount?: boolean
    disableError?: boolean
  }

export function TextArea({
  label,
  placeholder,
  ref,
  value,
  error,
  onChange,
  id,
  disabled,
  disableError = false,
  charCount = false,
  'min-height': minHeight = 14,
  ...props
}: TextAreaProps): ReactElement {
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const errorId = `${id}-error`
  const isFloating = isFocused || !!value || !!error
  const hasError = !!error
  const textAreaClassName = cn(
    textAreaClassNames({
      'min-height': minHeight,
    }),
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
      'text-base-lg top-6 -translate-y-1/2 left-4 text-text-secondary': !isFloating,
    },
  )

  function handleFocus(): void {
    setIsFocused(true)
  }

  function handleBlur(): void {
    setIsFocused(false)
  }

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>): void {
    onChange?.(e)
  }

  return (
    <FlexBox flex-direction="col" gap={2} width="full">
      <FlexBox flex-direction="row" align-items="center" justify-content="start">
        <FlexBoxItem flex="auto" position="relative">
          <label htmlFor={id} className={labelClassName}>
            {label}
          </label>

          <textarea
            {...props}
            id={id}
            ref={ref}
            value={value}
            placeholder={isFloating ? placeholder : ''}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : undefined}
            className={textAreaClassName}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </FlexBoxItem>
      </FlexBox>

      {!!charCount && (
        <FlexBox flex-direction="row" align-items="center" justify-content="end">
          <div className="text-xs text-text-secondary">
            {value?.toString().length} / {props.maxLength}
          </div>
        </FlexBox>
      )}

      {error && !disableError && (
        <FlexBox flex-direction="row" align-items="center" justify-content="start" gap={1}>
          <div id={errorId} className="text-xs text-text-primary-error" role="alert">
            <AlertCircle size={16} />
          </div>
          <div className="text-xs text-text-primary-error">{error}</div>
        </FlexBox>
      )}
    </FlexBox>
  )
}
