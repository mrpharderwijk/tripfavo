'use client'

import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { HeadingGroup } from '@/components/molecules/heading/heading'
import { SignUpForm } from '@/features/auth/sign-up/components/sign-up-form'
import { SignUpDialogFooter } from '@/features/auth/sign-up/sign-up-dialog/components/sign-up-dialog-footer'

export function SignUpDialogSignUp(): ReactElement {
  const tSignUpDialogSignUp = useTranslations('auth.signUpDialog.signUp')

  return (
    <>
      <HeadingGroup title={tSignUpDialogSignUp('title')} />
      <SignUpForm />
      <SignUpDialogFooter />
    </>
  )
}
