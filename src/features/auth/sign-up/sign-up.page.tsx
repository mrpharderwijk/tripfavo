import NextLink from 'next/link'
import { getTranslations } from 'next-intl/server'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Body } from '@/components/atoms/typography/body/body'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { SignUpForm } from '@/features/auth/sign-up/components/sign-up-form'
import { getRoutePathByRouteName } from '@/utils/get-route'

export async function SignUpPage(): Promise<ReactElement> {
  const tSignUpForm = await getTranslations('auth.signUpForm')

  return (
    <FlexBox
      flex-direction="col"
      gap={2}
      border={1}
      border-color="secondary"
      border-radius="xl"
    >
      <FlexBox
        tag="header"
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
      </FlexBox>

      <FlexBox flex-direction="col" gap={6} padding={8}>
        <Heading tag="h2" like="h5" color="primary" font-weight="semibold">
          {tSignUpForm('title')}
        </Heading>

        <SignUpForm />

        <FlexBox align-items="center" justify-content="center" gap={2}>
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
        </FlexBox>
      </FlexBox>
    </FlexBox>
  )
}
