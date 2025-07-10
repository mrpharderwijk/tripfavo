'use client'

import { ReactElement } from 'react'

import { SignUpDialogSignUp } from '@/features/auth/sign-up/sign-up-dialog/components/sign-up-dialog-sign-up'
import { SignUpDialogSuccess } from '@/features/auth/sign-up/sign-up-dialog/components/sign-up-dialog-success'
import { useSignUpDialogContext } from '@/features/auth/sign-up/sign-up-dialog/providers/sign-up-dialog-context-provider'

export function SignUpDialogContent(): ReactElement {
  const { signUpSuccess } = useSignUpDialogContext()

  return signUpSuccess ? <SignUpDialogSuccess /> : <SignUpDialogSignUp />
}
