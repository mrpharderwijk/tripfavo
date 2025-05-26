'use client'

import NextLink from 'next/link'
import { useTranslations } from 'next-intl'
import { ReactElement, useState } from 'react'
import { Controller } from 'react-hook-form'

import { Input } from '@/components/atoms/input/input'
import { Box } from '@/components/atoms/layout/box/box'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { Body } from '@/components/atoms/typography/body/body'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { Button } from '@/components/molecules/buttons/button'
import { InputPassword } from '@/components/molecules/input-password/input-password'
import { useSignUpForm } from '@/features/auth/sign-up/use-sign-up-form'
import { getRoutePathByRouteName } from '@/utils/get-route'

export function SignUpForm(): ReactElement {
  const { control, onSubmit, handleSubmit, errors, isLoading, error, registerSuccess } =
    useSignUpForm()
  const tSignUpForm = useTranslations('auth.signUpForm')
  const tCommon = useTranslations('common')
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)

  function onChangePasswordVisibility(value: boolean): void {
    setPasswordVisible(value)
  }

  return (
    <Box
      display="flex"
      flex-direction="col"
      gap={2}
      border={1}
      border-color="secondary"
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
          {tSignUpForm('heading')}
        </Heading>
      </Box>

      <Box display="flex" flex-direction="col" gap={6} padding={8}>
        {!registerSuccess ? (
          <>
            <Heading tag="h2" like="h5" color="primary" font-weight="semibold">
              {tSignUpForm('title')}
            </Heading>

            {error && <div className="text-sm text-red-500 mb-2">{error}</div>}

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

                  <FlexBox flex-direction="row" gap={4}>
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

                    <FlexBoxItem flex="initial" flex-basis="1/3">
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
                        disableError
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
                    render={({ field }) => (
                      <InputPassword
                        {...field}
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

                <Button variant="secondary" size="xl" type="submit" disabled={isLoading} fullWidth>
                  {tSignUpForm('submit')}
                </Button>
              </FlexBox>
            </form>

            <div className="flex items-center justify-center gap-2">
              <Body size="base-md" text-color="primary">
                {tSignUpForm('login.text')}
              </Body>

              <NextLink href={getRoutePathByRouteName('login')} passHref>
                <Body
                  tag="span"
                  font-size="base-md"
                  text-color="primary"
                  text-decoration="underline"
                  font-weight="bold"
                >
                  {tSignUpForm('login.label')}
                </Body>
              </NextLink>
            </div>
          </>
        ) : (
          <>
            <Heading tag="h2" like="h5" color="primary" font-weight="semibold">
              {tSignUpForm('success.heading')}
            </Heading>

            <Body size="base-md" text-color="primary">
              {tSignUpForm('success.description')}
            </Body>

            <Body size="base-md" text-color="primary">
              {tSignUpForm.rich('success.link', {
                link: (chunks) => (
                  <NextLink href={getRoutePathByRouteName('login')} passHref>
                    <Body
                      tag="span"
                      size="base-md"
                      text-color="primary"
                      text-decoration="underline"
                      font-weight="bold"
                    >
                      {chunks}
                    </Body>
                  </NextLink>
                ),
              })}
            </Body>
          </>
        )}
      </Box>
    </Box>
  )
}
