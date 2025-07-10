'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ReactElement, useState } from 'react'
import { Controller } from 'react-hook-form'

import { Input } from '@/components/atoms/forms/input/input'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Button } from '@/components/molecules/buttons/button'
import { FormNotification } from '@/components/molecules/form-notification/form-notification'
import { InputPassword } from '@/components/molecules/input-password/input-password'
import { LoginSuccessDialog } from '@/features/auth/login/components/login-success-dialog'
import { useLoginForm } from '@/features/auth/login/components/use-login-form'
import { getRoutePathByRouteName } from '@/utils/get-route'

export function LoginForm(): ReactElement {
  const { control, onSubmit, handleSubmit, errors, isLoading, error } =
    useLoginForm()
  const tLoginForm = useTranslations('auth.loginForm')
  const tCommon = useTranslations('common')
  const router = useRouter()

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)

  function onCloseSuccessDialog(): void {
    router.push(getRoutePathByRouteName('accountSettings'))
  }

  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <FlexBox flex-direction="col" gap={6}>
          {error && (
            <FormNotification
              variant="danger"
              description={
                error === 'INVALID_CREDENTIALS'
                  ? tLoginForm('error.invalidCredentials')
                  : tCommon('forms.error.unknown')
              }
            />
          )}
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

              <Controller
                name="password"
                control={control}
                rules={{
                  required: tCommon('forms.required', {
                    field: tCommon('forms.password.label'),
                  }),
                }}
                render={({ field }) => (
                  <InputPassword
                    {...field}
                    id="password"
                    label={tCommon('forms.password.label')}
                    placeholder={tCommon('forms.password.placeholder')}
                    toggleVisibility
                    passwordVisible={passwordVisible}
                    onChangePasswordVisibility={() =>
                      setPasswordVisible(!passwordVisible)
                    }
                    disabled={isLoading}
                    error={errors.password?.message?.toString()}
                  />
                )}
              />
            </FlexBox>

            <Button
              variant="secondary"
              size="xl"
              type="submit"
              disabled={isLoading}
              fullWidth
            >
              {tLoginForm('submit')}
            </Button>
          </FlexBox>
        </FlexBox>
      </form>
      <LoginSuccessDialog onCloseCallback={onCloseSuccessDialog} />
    </>
  )
}
