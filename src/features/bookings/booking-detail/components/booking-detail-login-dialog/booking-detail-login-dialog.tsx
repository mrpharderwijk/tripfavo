'use client'

import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Body } from '@/components/atoms/typography/body/body'
import { Button } from '@/components/molecules/buttons/button'
import { HeadingGroup } from '@/components/molecules/heading/heading'
import { ModalDialog } from '@/components/molecules/modal-dialog/modal-dialog'
import { LoginForm } from '@/features/auth/login/components/login-form'
import { BookingDetailLoginSuccessDialog } from '@/features/bookings/booking-detail/components/booking-detail-login-dialog/booking-detail-login-success-dialog'
import { useDialogContext } from '@/features/nav-bar/providers/dialog-context-provider'

type BookingDetailLoginDialogProps = {
  onSuccessCallback?: () => void
}

/**
 * @deprecated
 * @param param0
 * @returns
 */
export function BookingDetailLoginDialog({
  onSuccessCallback,
}: BookingDetailLoginDialogProps): ReactElement {
  const tLoginForm = useTranslations('auth.loginForm')
  const tBookingDetailLoginDialog = useTranslations('bookingDetail.loginDialog')
  const { currentOpenDialog, openDialog } = useDialogContext()
  const headingGroupSubtitle = tBookingDetailLoginDialog.rich('subtitle', {
    link: (chunks) => (
      <Button variant="primary-link" onClick={handleOnOpenSignUpDialog}>
        {chunks}
      </Button>
    ),
  })

  function handleOnOpenSignUpDialog(): void {
    openDialog('booking-detail-sign-up')
  }

  function handleOnClickConfirm(): void {
    onSuccessCallback?.()
  }

  return (
    <>
      <ModalDialog
        isVisible={currentOpenDialog === 'booking-detail-login'}
        header={<>{tLoginForm('heading')}</>}
      >
        <HeadingGroup
          title={tBookingDetailLoginDialog('heading')}
          subtitle={headingGroupSubtitle}
        />

        <FlexBox flex-direction="col" gap={6}>
          <LoginForm />

          <FlexBox align-items="center" justify-content="center" gap={2}>
            <Body size="base-md" text-color="primary">
              {tLoginForm.rich('signUp.text', {
                link: (chunks) => (
                  <Button
                    variant="primary-link"
                    onClick={handleOnOpenSignUpDialog}
                  >
                    <Body
                      tag="span"
                      font-size="base-md"
                      text-color="primary"
                      text-decoration="underline"
                      font-weight="bold"
                    >
                      {chunks}
                    </Body>
                  </Button>
                ),
              })}
            </Body>
          </FlexBox>
        </FlexBox>
      </ModalDialog>
      <BookingDetailLoginSuccessDialog
        onSuccessCallback={handleOnClickConfirm}
      />
    </>
  )
}
