import { ReactElement, useRef } from 'react'

import { Input, InputProps } from '@/components/atoms/input/input'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Button } from '@/components/molecules/buttons/button'
import { InputPasswordFeedback } from '@/components/molecules/input-password/input-password-feedback'

type InputPasswordProps = InputProps & {
  passwordVisible?: boolean
  toggleVisibility?: boolean
  onChangePasswordVisibility?: (value: boolean) => void
  disableFeedback?: boolean
  touched?: boolean
  dirty?: boolean
}

export function InputPassword({
  id,
  label,
  error,
  disableError,
  disableFeedback = false,
  passwordVisible = false,
  onChangePasswordVisibility,
  toggleVisibility = false,
  touched = false,
  dirty = false,
  ...props
}: InputPasswordProps): ReactElement {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleOnClickPasswordVisibility(): void {
    onChangePasswordVisibility?.(!passwordVisible)
    inputRef?.current?.focus()
  }

  return (
    <FlexBox flex-direction="col" align-items="start" gap={2}>
      <Input
        {...props}
        type={passwordVisible ? 'text' : 'password'}
        id={id}
        label={label}
        error={error}
        disableError={disableError}
        autoComplete="current-password"
        passwordrules="required: upper; required: lower; required: digit; required: special; minlength: 8;"
        customAction={
          !!toggleVisibility && (
            <div className="flex items-center justify-center h-14 border border-border-quarternary border-l-0 rounded-r-lg text-base-sm underline p-4">
              <Button variant="primary-link" size="sm" onClick={handleOnClickPasswordVisibility}>
                {passwordVisible ? 'Hide' : 'Show'}
              </Button>
            </div>
          )
        }
        ref={inputRef}
      />

      {!disableFeedback && dirty && (
        <FlexBox
          flex-direction="col"
          align-items="start"
          justify-content="center"
          gap={2}
          border={1}
          border-color="tertiary"
          padding={4}
          border-radius="lg"
          bg-color="secondary"
        >
          <InputPasswordFeedback
            invalidMessage="Password must be at least 8 characters long"
            valid={/(?=.{8,})/.test(props.value?.toString() ?? '')}
          />
          <InputPasswordFeedback
            invalidMessage="Password must contain at least one uppercase letter"
            valid={/(?=.*[A-Z])/.test(props.value?.toString() ?? '')}
          />
          <InputPasswordFeedback
            invalidMessage="Password must contain at least one lowercase letter"
            valid={/(?=.*[a-z])/.test(props.value?.toString() ?? '')}
          />
          <InputPasswordFeedback
            invalidMessage="Password must contain at least one number"
            valid={/(?=.*[0-9])/.test(props.value?.toString() ?? '')}
          />
          <InputPasswordFeedback
            invalidMessage="Password must contain at least one special character"
            valid={/(?=.*[!@#$%^&*()_+\-{}[\]:";'<>,.?/\\=])/.test(props.value?.toString() ?? '')}
          />
        </FlexBox>
      )}
    </FlexBox>
  )
}
