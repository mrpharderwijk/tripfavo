'use client'

import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Body } from '@/components/atoms/typography/body/body'
import { Button } from '@/components/molecules/buttons/button'
import { HeadingGroup } from '@/components/molecules/heading/heading'
import { ModalDialog } from '@/components/molecules/modal-dialog/modal-dialog'
import { SignUpForm } from '@/features/auth/sign-up/components/sign-up-form'
import { useDialogContext } from '@/features/nav-bar/providers/dialog-context-provider'

type BookingDetailSignUpDialogProps = {
  onSuccessCallback?: () => void
}

/**
 * @deprecated
 * @param param0
 * @returns
 */
export function BookingDetailSignUpDialog({
  onSuccessCallback,
}: BookingDetailSignUpDialogProps): ReactElement {
  const tSignUpForm = useTranslations('auth.signUpForm')
  const tBookingDetailSignUpDialog = useTranslations(
    'bookingDetail.signUpDialog',
  )
  const { currentOpenDialog, openDialog } = useDialogContext()
  const headingGroupSubtitle = tBookingDetailSignUpDialog.rich('subtitle', {
    link: (chunks) => (
      <Button
        variant="primary-link"
        onClick={() => openDialog('booking-login')}
      >
        {chunks}
      </Button>
    ),
  })

  return (
    <>
      <ModalDialog
        isVisible={currentOpenDialog === 'booking-detail-sign-up'}
        header={<>{tSignUpForm('heading')}</>}
      >
        <HeadingGroup
          title={tBookingDetailSignUpDialog('heading')}
          subtitle={headingGroupSubtitle}
        />

        <FlexBox flex-direction="col" gap={6}>
          <SignUpForm />

          <FlexBox align-items="center" justify-content="center" gap={2}>
            <Body size="base-md" text-color="primary">
              {tSignUpForm.rich('login.text', {
                link: (chunks) => (
                  <Button
                    variant="primary-link"
                    onClick={() => openDialog('booking-detail-login')}
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
    </>
  )
}
