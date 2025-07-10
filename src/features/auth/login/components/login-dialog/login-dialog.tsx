'use client'

import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { HeadingGroup } from '@/components/molecules/heading/heading'
import { ModalDialog } from '@/components/molecules/modal-dialog/modal-dialog'
import { LoginDialogFooter } from '@/features/auth/login/components/login-dialog/login-dialog-footer'
import { LoginForm } from '@/features/auth/login/components/login-form'
import { useDialogContext } from '@/features/nav-bar/providers/dialog-context-provider'

export function LoginDialog(): ReactElement {
  const tLoginForm = useTranslations('auth.loginForm')
  const { currentOpenDialog } = useDialogContext()

  return (
    <>
      <ModalDialog
        isVisible={currentOpenDialog === 'login'}
        header={<>{tLoginForm('heading')}</>}
      >
        <FlexBox flex-direction="col" gap={6}>
          <HeadingGroup title={tLoginForm('title')} />

          <LoginForm />

          <LoginDialogFooter />
        </FlexBox>
      </ModalDialog>
    </>
  )
}
