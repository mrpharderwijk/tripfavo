'use client'

import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ReactElement, useEffect, useState } from 'react'

import { Box } from '@/components/atoms/layout/box/box'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Body } from '@/components/atoms/typography/body/body'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { FormNotification } from '@/components/molecules/form-notification/form-notification'

type VerificationState = 'error' | 'success'

export function VerifyEmailContent(): ReactElement {
  const searchParams = useSearchParams()
  const [state, setState] = useState<VerificationState>('success')
  const [error, setError] = useState<string | null>(null)
  const tAuth = useTranslations('auth.verifyEmail')
  const tCommon = useTranslations('common')

  useEffect((): void => {
    const errorParam = searchParams.get('error')

    if (errorParam) {
      setState('error')
      setError(errorParam)
    } else {
      setState('success')
    }
  }, [searchParams])

  const getErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
      case 'MISSING_PARAMS':
        return tAuth('error.missingParams')
      case 'INVALID_TOKEN':
        return tAuth('error.invalidToken')
      case 'TOKEN_EXPIRED':
        return tAuth('error.tokenExpired')
      case 'VERIFICATION_FAILED':
        return tAuth('error.verificationFailed')
      case 'SIGNIN_FAILED':
        return tAuth('error.signinFailed')
      case 'SESSION_ERROR':
        return tAuth('error.sessionError')
      case 'USER_NOT_FOUND':
        return tAuth('error.userNotFound')
      case 'INTERNAL_ERROR':
        return tAuth('error.internalError')
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
          {tAuth('heading')}
        </Heading>
      </Box>

      <Box display="flex" flex-direction="col" gap={6} padding={8}>
        {state === 'error' && error && (
          <FlexBox flex-direction="col" gap={4}>
            <FormNotification
              variant="danger"
              description={getErrorMessage(error)}
            />
            <Body size="base-md" text-color="primary" text-align="center">
              {tAuth('error.contactSupport')}
            </Body>
          </FlexBox>
        )}

        {state === 'success' && (
          <FlexBox
            flex-direction="col"
            gap={4}
            align-items="center"
            text-align="center"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <Heading tag="h2" like="h5" color="primary" font-weight="semibold">
              {tAuth('success.title')}
            </Heading>
            <Body size="base-md" text-color="secondary" text-align="center">
              {tAuth('success.description')}
            </Body>
          </FlexBox>
        )}
      </Box>
    </Box>
  )
}
