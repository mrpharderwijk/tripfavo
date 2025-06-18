'use client'

import { WandSparkles } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { Box } from '@/components/atoms/layout/box/box'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Body } from '@/components/atoms/typography/body/body'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { Button } from '@/components/molecules/buttons/button'

interface MagicLinkSuccessProps {
  email: string
  onResend?: () => Promise<void>
  isResending?: boolean
  onBackToLogin?: () => void
}

export function MagicLinkSuccess({
  email,
  onResend,
  isResending = false,
  onBackToLogin,
}: MagicLinkSuccessProps): ReactElement {
  const tLoginForm = useTranslations('auth.loginForm')
  const tCommon = useTranslations('common')

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
          {tLoginForm('success.heading')}
        </Heading>
      </Box>

      <Box display="flex" flex-direction="col" gap={6} padding={8}>
        <FlexBox
          flex-direction="col"
          gap={4}
          align-items="center"
          text-align="center"
        >
          {/* Success Icon */}
          <Box
            display="flex"
            align-items="center"
            justify-content="center"
            width={16}
            height={16}
            border-radius="full"
            background-color="success"
          >
            <WandSparkles size={32} />
          </Box>

          <FlexBox flex-direction="col" gap={2}>
            <Heading
              tag="h2"
              like="h4"
              color="primary"
              font-weight="bold"
              text-align="center"
            >
              {tLoginForm('success.title')}
            </Heading>

            <Body size="base-md" text-color="secondary" text-align="center">
              {tLoginForm('success.description', { email })}
            </Body>
          </FlexBox>

          <Body size="base-sm" text-color="tertiary" text-align="center">
            {tLoginForm('success.checkSpam')}
          </Body>
        </FlexBox>

        <FlexBox flex-direction="col" gap={3}>
          <Button
            variant="primary-inverse"
            size="xl"
            fullWidth
            onClick={onBackToLogin}
          >
            {tLoginForm('success.backToLogin')}
          </Button>
        </FlexBox>

        <div className="flex items-center justify-center gap-2">
          <Body size="base-sm" text-color="tertiary">
            {tLoginForm('success.noEmail')}
          </Body>

          <Button
            variant="primary-link"
            size="sm"
            disabled={isResending}
            onClick={onResend}
          >
            {isResending
              ? tLoginForm('submitting')
              : tLoginForm('success.resend')}
          </Button>
        </div>
      </Box>
    </Box>
  )
}
