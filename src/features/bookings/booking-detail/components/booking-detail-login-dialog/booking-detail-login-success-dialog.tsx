'use client'

import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Body } from '@/components/atoms/typography/body/body'
import { Button } from '@/components/molecules/buttons/button'
import { HeadingGroup } from '@/components/molecules/heading/heading'
import { ModalDialog } from '@/components/molecules/modal-dialog/modal-dialog'
import { useDialogContext } from '@/features/nav-bar/providers/dialog-context-provider'

type BookingDetailLoginSuccessDialogProps = {
  onSuccessCallback?: () => void
}

/**
 * @deprecated
 * @param param0
 * @returns
 */
export function BookingDetailLoginSuccessDialog({
  onSuccessCallback,
}: BookingDetailLoginSuccessDialogProps): ReactElement {
  const tLoginForm = useTranslations('auth.loginForm')
  const tBookingDetailLoginSuccessDialog = useTranslations(
    'bookingDetail.loginSuccessDialog',
  )
  const { currentOpenDialog, openDialog } = useDialogContext()
  const headingGroupSubtitle = tBookingDetailLoginSuccessDialog.rich(
    'subtitle',
    {
      link: (chunks) => (
        <Button
          variant="primary-link"
          onClick={() => openDialog('booking-login')}
        >
          {chunks}
        </Button>
      ),
    },
  )

  return (
    <>
      <ModalDialog
        isVisible={currentOpenDialog === 'booking-detail-login-success'}
        header={tLoginForm('heading')}
      >
        <HeadingGroup
          title={tBookingDetailLoginSuccessDialog('heading')}
          subtitle={headingGroupSubtitle}
        />

        <FlexBox flex-direction="col" gap={6}>
          <FlexBox align-items="center" justify-content="center" gap={2}>
            <Body size="base-md" text-color="primary">
              {tLoginForm.rich('signUp.text', {
                link: (chunks) => (
                  <Button
                    variant="primary-link"
                    onClick={() => openDialog('booking-detail-sign-up')}
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
