'use client'

import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { Heading } from '@/components/atoms/typography/heading/heading'
import { Text } from '@/components/atoms/typography/text/text'
import { Button } from '@/components/molecules/buttons/button'
import { ModalDialog } from '@/components/molecules/modal-dialog/modal-dialog'
import { useDialogContext } from '@/features/nav-bar/providers/dialog-context-provider'

type LoginSuccessDialogProps = {
  onCloseCallback?: () => void
}

export function LoginSuccessDialog({
  onCloseCallback,
}: LoginSuccessDialogProps): ReactElement {
  const { currentOpenDialog, closeDialog } = useDialogContext()
  const tLoginSuccessDialog = useTranslations('auth.loginForm.successDialog')

  function handleOnClose(): void {
    closeDialog()
    onCloseCallback?.()
  }

  return (
    <ModalDialog
      isVisible={currentOpenDialog === 'sign-up-success'}
      header={tLoginSuccessDialog('heading')}
      onClose={handleOnClose}
      footer={
        onCloseCallback ? (
          <Button variant="secondary" size="lg" onClick={handleOnClose}>
            {tLoginSuccessDialog('button.continue')}
          </Button>
        ) : undefined
      }
    >
      <Heading tag="h3" like="h2-semibold">
        {tLoginSuccessDialog('title')}
      </Heading>
      <Text font-size="base-mdt">{tLoginSuccessDialog('subtitle')}</Text>
    </ModalDialog>
  )
}
