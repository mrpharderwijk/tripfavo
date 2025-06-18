'use client'

import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'
import { Controller } from 'react-hook-form'

import { Input } from '@/components/atoms/forms/input/input'
import { Box } from '@/components/atoms/layout/box/box'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { Button } from '@/components/molecules/buttons/button'
import { FormNotification } from '@/components/molecules/form-notification/form-notification'
import { MagicLinkSuccess } from '@/features/auth/magic-link-login/components/magic-link-login-form/magic-link-success'
import { useMagicLinkLoginForm } from '@/features/auth/magic-link-login/components/magic-link-login-form/use-magic-link-login'

export function MagicLinkLoginForm(): ReactElement {
  const {
    control,
    onSubmit,
    handleSubmit,
    errors,
    isLoading,
    error,
    isSuccess,
    sentEmail,
    resendMagicLink,
    resetForm,
  } = useMagicLinkLoginForm()
  const tLoginForm = useTranslations('auth.loginForm')
  const tCommon = useTranslations('common')

  // Show success page if email was sent successfully
  if (isSuccess && sentEmail) {
    return (
      <MagicLinkSuccess
        email={sentEmail}
        onResend={resendMagicLink}
        isResending={isLoading}
        onBackToLogin={resetForm}
      />
    )
  }

  const getErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
      case 'INVALID_EMAIL':
        return tLoginForm('error.invalidEmail')
      case 'VERIFICATION_FAILED':
        return tLoginForm('error.verificationFailed')
      case 'ACCESS_DENIED':
        return tLoginForm('error.accessDenied')
      case 'CONFIGURATION_ERROR':
        return tLoginForm('error.configurationError')
      case 'SIGNIN_ERROR':
        return tLoginForm('error.signinError')
      case 'NETWORK_ERROR':
        return tCommon('forms.error.network')
      case 'UNEXPECTED_ERROR':
        return tCommon('forms.error.unknown')
      case 'INVALID_CREDENTIALS':
        return tLoginForm('error.invalidCredentials')
      default:
        return tCommon('forms.error.unknown')
    }
  }

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

        {error && (
          <FormNotification
            variant="danger"
            description={getErrorMessage(error)}
          />
        )}

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
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
            </FlexBox>

            <Button
              variant="secondary"
              size="xl"
              type="submit"
              disabled={isLoading}
              fullWidth
            >
              {isLoading ? tLoginForm('submitting') : tLoginForm('submit')}
            </Button>
          </FlexBox>
        </form>
      </Box>
    </Box>
  )
}
