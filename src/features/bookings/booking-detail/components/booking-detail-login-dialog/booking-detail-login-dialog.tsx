'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Body } from '@/components/atoms/typography/body/body'
import { Button } from '@/components/molecules/buttons/button'
import { HeadingGroup } from '@/components/molecules/heading/heading'
import { ModalDialog } from '@/components/molecules/modal-dialog/modal-dialog'
import { LoginForm } from '@/features/auth/credentials-login/components/login-form'
import { useBookingDetailContext } from '@/features/bookings/booking-detail/providers/booking-detail-context-provider'
import { useDialogContext } from '@/features/nav-bar/providers/dialog-context-provider'

/**
 * TODO: Add translations
 */
export function BookingDetailLoginDialog(): ReactElement {
  const tLoginForm = useTranslations('auth.loginForm')
  const tBookingDetailLoginDialog = useTranslations('bookingDetail.loginDialog')
  const { property } = useBookingDetailContext()
  const { currentOpenDialog, closeDialog, openDialog } = useDialogContext()
  const router = useRouter()
  const headingGroupSubtitle = tBookingDetailLoginDialog.rich('subtitle', {
    link: (chunks) => (
      <Button
        variant="primary-link"
        onClick={() => openDialog('booking-sign-up')}
      >
        {chunks}
      </Button>
    ),
  })

  return (
    <ModalDialog
      isVisible={currentOpenDialog === 'booking-login'}
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
            {tLoginForm('register.text')}
          </Body>

          <Button
            variant="primary-link"
            onClick={() => openDialog('booking-sign-up')}
          >
            <Body
              tag="span"
              font-size="base-md"
              text-color="primary"
              text-decoration="underline"
              font-weight="bold"
            >
              {tLoginForm('register.label')}
            </Body>
          </Button>
        </FlexBox>
      </FlexBox>
    </ModalDialog>
  )
}
