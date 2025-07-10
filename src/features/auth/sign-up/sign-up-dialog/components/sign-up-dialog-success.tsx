'use client'

import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Button } from '@/components/molecules/buttons/button'
import { HeadingGroup } from '@/components/molecules/heading/heading'
import { useDialogContext } from '@/features/nav-bar/providers/dialog-context-provider'

type SignUpDialogSuccessProps = {
  onCloseCallback?: () => void
}

export function SignUpDialogSuccess({
  onCloseCallback,
}: SignUpDialogSuccessProps): ReactElement {
  const { closeDialog } = useDialogContext()
  const tSignUpDialogSuccess = useTranslations('auth.signUpDialog.success')

  function handleOnClose(): void {
    closeDialog()
    onCloseCallback?.()
  }

  return (
    <FlexBox flex-direction="col" gap={6}>
      <HeadingGroup
        title={tSignUpDialogSuccess('title')}
        subtitle={tSignUpDialogSuccess('subtitle')}
      />

      <Button variant="secondary" size="xl" onClick={handleOnClose} fullWidth>
        {tSignUpDialogSuccess('button.continue')}
      </Button>
    </FlexBox>
  )
}
