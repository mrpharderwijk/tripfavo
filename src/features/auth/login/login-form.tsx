'use client'

import NextLink from 'next/link'
import { useTranslations } from 'next-intl'
import { ReactElement, useState } from 'react'
import { Controller } from 'react-hook-form'

import { Input } from '@/components/atoms/input/input'
import { Box } from '@/components/atoms/layout/box/box'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Body } from '@/components/atoms/typography/body/body'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { Button } from '@/components/molecules/buttons/button'
import { FormNotification } from '@/components/molecules/form-notification/form-notification'
import { InputPassword } from '@/components/molecules/input-password/input-password'
import { useLoginForm } from '@/features/auth/login/use-login-form'
import { getRoutePathByRouteName } from '@/utils/get-route'

export function LoginForm(): ReactElement {
  const { control, onSubmit, handleSubmit, errors, isLoading, error } = useLoginForm()
  const tLoginForm = useTranslations('auth.loginForm')
  const tCommon = useTranslations('common')

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)

  return (
    <Box
      display="flex"
      flex-direction="col"
      gap={2}
      border={1}
      border-color="quarternary"
      border-radius="xl"
    >
      <Box
        tag="header"
        display="flex"
        flex-direction="row"
        align-items="center"
        justify-content="center"
        padding-y={5}
        border-b={1}
        border-color="secondary-disabled"
      >
        <Heading tag="h1" like="h3-base" color="primary" font-weight="bold">
          {tLoginForm('heading')}
        </Heading>
      </Box>

      <Box display="flex" flex-direction="col" gap={6} padding={8}>
        <Heading tag="h2" like="h5" color="primary" font-weight="semibold">
          {tLoginForm('title')}
        </Heading>

        {!!errors && !!Object.keys(errors).length && (
          <FormNotification variant="danger">
            {errors.email?.message?.toString()}
            <br />
            {errors.password?.message?.toString()}
          </FormNotification>
        )}

        {error && (
          <FormNotification variant="danger">
            {error === 'INVALID_CREDENTIALS'
              ? tLoginForm('error.invalidCredentials')
              : tCommon('forms.error.unknown')}
          </FormNotification>
        )}

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <FlexBox flex-direction="col" gap={4}>
            <FlexBox flex-direction="col" gap={3}>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: tCommon('forms.required', { field: tCommon('forms.email.label') }),
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
                  required: tCommon('forms.required', { field: tCommon('forms.password.label') }),
                }}
                render={({ field }) => (
                  <InputPassword
                    {...field}
                    id="password"
                    label={tCommon('forms.password.label')}
                    placeholder={tCommon('forms.password.placeholder')}
                    toggleVisibility
                    passwordVisible={passwordVisible}
                    onChangePasswordVisibility={() => setPasswordVisible(!passwordVisible)}
                    disabled={isLoading}
                    error={errors.password?.message?.toString()}
                  />
                )}
              />
            </FlexBox>

            <Button variant="secondary" size="xl" type="submit" disabled={isLoading} fullWidth>
              {tLoginForm('submit')}
            </Button>
          </FlexBox>
        </form>

        <div className="flex items-center justify-center gap-2">
          <Body size="base-md" text-color="primary">
            {tLoginForm('register.text')}
          </Body>

          <NextLink href={getRoutePathByRouteName('signUp')} passHref>
            <Body
              tag="span"
              font-size="base-md"
              text-color="primary"
              text-decoration="underline"
              font-weight="bold"
            >
              {tLoginForm('register.label')}
            </Body>
          </NextLink>
        </div>
      </Box>
    </Box>
  )
}
