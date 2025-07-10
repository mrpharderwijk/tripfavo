'use client'

import { useTranslations } from 'next-intl'
import { ReactElement, useState } from 'react'
import { Controller } from 'react-hook-form'

import { Input } from '@/components/atoms/forms/input/input'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { Button } from '@/components/molecules/buttons/button'
import { InputPassword } from '@/components/molecules/input-password/input-password'
import { useSignUpForm } from '@/features/auth/sign-up/components/use-sign-up-form'

type SignUpFormProps = {
  onSuccessCallback?: () => void
}

export function SignUpForm(): ReactElement {
  const { control, onSubmit, handleSubmit, errors, isLoading, error } =
    useSignUpForm()
  const tSignUpForm = useTranslations('auth.signUpDialog.form')
  const tCommon = useTranslations('common')
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)

  function onChangePasswordVisibility(value: boolean): void {
    setPasswordVisible(value)
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <FlexBox flex-direction="col" gap={8}>
        {error && <div className="text-sm text-red-500 mb-2">{error}</div>}
        <FlexBox flex-direction="col" gap={4}>
          <FlexBox flex-direction="col" gap={3}>
            <Controller
              name="email"
              control={control}
              rules={{
                required: tCommon('forms.required', {
                  field: tCommon('forms.email.label'),
                }),
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  id="email"
                  label={tCommon('forms.email.label')}
                  placeholder={tCommon('forms.email.placeholder')}
                  disabled={isLoading}
                  error={errors.email?.message?.toString()}
                />
              )}
            />

            <FlexBox flex-direction="col" flex-direction-md="row" gap={4}>
              <FlexBoxItem flex="auto">
                <Controller
                  name="firstName"
                  control={control}
                  rules={{
                    required: tCommon('forms.required', {
                      field: tCommon('forms.firstName.label'),
                    }),
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="firstName"
                      label={tCommon('forms.firstName.label')}
                      placeholder={tCommon('forms.firstName.placeholder')}
                      disabled={isLoading}
                      error={errors.firstName?.message?.toString()}
                    />
                  )}
                />
              </FlexBoxItem>

              <FlexBoxItem flex="initial" flex-basis="full" flex-basis-md="1/3">
                <Controller
                  name="middleName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="middleName"
                      label={tCommon('forms.middleName.label')}
                      placeholder={tCommon('forms.middleName.placeholder')}
                      disabled={isLoading}
                      error={errors.middleName?.message?.toString()}
                    />
                  )}
                />
              </FlexBoxItem>
            </FlexBox>

            <Controller
              name="lastName"
              control={control}
              rules={{
                required: tCommon('forms.required', {
                  field: tCommon('forms.lastName.label'),
                }),
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  id="lastName"
                  label={tCommon('forms.lastName.label')}
                  placeholder={tCommon('forms.lastName.placeholder')}
                  disabled={isLoading}
                  error={errors.lastName?.message?.toString()}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={{
                required: tCommon('forms.required', {
                  field: tCommon('forms.password.label'),
                }),
              }}
              render={({ field, fieldState }) => (
                <InputPassword
                  {...field}
                  touched={fieldState.isTouched}
                  dirty={fieldState.isDirty}
                  id="password"
                  label={tCommon('forms.password.label')}
                  placeholder={tCommon('forms.password.placeholder')}
                  disabled={isLoading}
                  error={errors.password?.message?.toString()}
                  passwordVisible={passwordVisible}
                  onChangePasswordVisibility={onChangePasswordVisibility}
                  toggleVisibility
                />
              )}
            />

            <Controller
              name="passwordConfirm"
              control={control}
              rules={{
                required: tCommon('forms.required', {
                  field: tCommon('forms.password.label'),
                }),
              }}
              render={({ field, fieldState }) => (
                <InputPassword
                  {...field}
                  touched={fieldState.isTouched}
                  dirty={fieldState.isDirty}
                  id="passwordConfirm"
                  label={tCommon('forms.passwordConfirm.label')}
                  placeholder={tCommon('forms.passwordConfirm.placeholder')}
                  disabled={isLoading}
                  error={errors.passwordConfirm?.message?.toString()}
                  passwordVisible={passwordVisible}
                  onChangePasswordVisibility={onChangePasswordVisibility}
                  toggleVisibility
                  disableFeedback
                />
              )}
            />
          </FlexBox>

          <Button
            variant="secondary"
            size="xl"
            type="submit"
            loading={isLoading}
            disabled={isLoading}
            fullWidth
          >
            {tSignUpForm('submit')}
          </Button>
        </FlexBox>
      </FlexBox>
    </form>
  )
}
