'use client'

import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'
import { Controller } from 'react-hook-form'

import { Input } from '@/components/atoms/input/input'
import { Box } from '@/components/atoms/layout/box/box'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Body } from '@/components/atoms/typography/body/body'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { Button } from '@/components/molecules/buttons/button'
import { routes } from '@/constants/routes'
import { useLoginForm } from '@/features/auth/login/use-login-form'

export function LoginForm(): ReactElement {
  const { control, onSubmit, handleSubmit, errors, isLoading, error } = useLoginForm()
  const router = useRouter()
  const tLoginForm = useTranslations('auth.loginForm')
  const tCommon = useTranslations('common')
  function onClickRegister(): void {
    router.push('/register')
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
          {tLoginForm('heading')}
        </Heading>
      </Box>

      <Box display="flex" flex-direction="col" gap={6} padding={8}>
        <Heading tag="h2" like="h5" color="primary" font-weight="semibold">
          {tLoginForm('title')}
        </Heading>

        {error && <div className="text-sm text-red-500 mb-2">{error}</div>}

        <form onSubmit={handleSubmit(onSubmit)}>
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
                    id="email"
                    label={tCommon('forms.email.label')}
                    placeholder={tCommon('forms.email.placeholder')}
                    disabled={isLoading}
                    error={errors.email?.message?.toString()}
                    {...field}
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
                  <Input
                    id="password"
                    label="Password"
                    placeholder="Password"
                    disabled={isLoading}
                    error={errors.password?.message?.toString()}
                    {...field}
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

          <NextLink href={routes.signUp.path} passHref>
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
