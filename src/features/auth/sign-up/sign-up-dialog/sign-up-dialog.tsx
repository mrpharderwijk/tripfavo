'use client'

import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { ModalDialog } from '@/components/molecules/modal-dialog/modal-dialog'
import { SignUpDialogContent } from '@/features/auth/sign-up/sign-up-dialog/components/sign-up-dialog-content'
import { SignUpDialogContextProvider } from '@/features/auth/sign-up/sign-up-dialog/providers/sign-up-dialog-context-provider'
import { useDialogContext } from '@/features/nav-bar/providers/dialog-context-provider'

export function SignUpDialog(): ReactElement {
  const tSignUpDialog = useTranslations('auth.signUpDialog')
  const { currentOpenDialog } = useDialogContext()

  return (
    <SignUpDialogContextProvider>
      <ModalDialog
        isVisible={currentOpenDialog === 'sign-up'}
        header={<>{tSignUpDialog('heading')}</>}
      >
        <FlexBox flex-direction="col" gap={6}>
          <SignUpDialogContent />
        </FlexBox>
      </ModalDialog>
    </SignUpDialogContextProvider>
  )
}
