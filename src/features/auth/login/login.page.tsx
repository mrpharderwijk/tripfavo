import NextLink from 'next/link'
import { getTranslations } from 'next-intl/server'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Body } from '@/components/atoms/typography/body/body'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { LoginForm } from '@/features/auth/login/components/login-form'
import { getRoutePathByRouteName } from '@/utils/get-route'

export async function CredentialsLoginPage(): Promise<ReactElement> {
  const tLoginForm = await getTranslations('auth.loginForm')

  return (
    <FlexBox
      flex-direction="col"
      gap={2}
      border={1}
      border-color="quarternary"
      border-radius="xl"
    >
      <FlexBox
        tag="header"
        flex-direction="row"
        align-items="center"
        justify-content="center"
        padding-y={6}
        border-b={1}
        border-color="secondary-disabled"
      >
        <Heading tag="h1" like="h3-base" color="primary" font-weight="bold">
          {tLoginForm('heading')}
        </Heading>
      </FlexBox>

      <FlexBox flex-direction="col" gap={6} padding={6}>
        <Heading tag="h2" like="h5" color="primary" font-weight="semibold">
          {tLoginForm('title')}
        </Heading>

        <LoginForm />

        <FlexBox align-items="center" justify-content="center" gap={2}>
          <Body size="base-md" text-color="primary">
            {tLoginForm.rich('signUp.text', {
              link: (chunks) => (
                <NextLink href={getRoutePathByRouteName('signUp')} passHref>
                  <Body
                    tag="span"
                    font-size="base-md"
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
        </FlexBox>
      </FlexBox>
    </FlexBox>
  )
}
