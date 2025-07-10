'use client'

import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { Heading } from '@/components/atoms/typography/heading/heading'
import { Text } from '@/components/atoms/typography/text/text'
import { Button } from '@/components/molecules/buttons/button'
import { ModalDialog } from '@/components/molecules/modal-dialog/modal-dialog'
import { useDialogContext } from '@/features/nav-bar/providers/dialog-context-provider'

type BookingDetailSignUpSuccessDialogProps = {
  onSuccessCallback?: () => void
}

/**
 * @deprecated
 * @param param0
 * @returns
 */
export function BookingDetailSignUpSuccessDialog({
  onSuccessCallback,
}: BookingDetailSignUpSuccessDialogProps): ReactElement {
  const { currentOpenDialog } = useDialogContext()
  const tBookingDetailSignUpSuccessDialog = useTranslations(
    'bookingDetail.signUpSuccessDialog',
  )

  function handleOnCloseModalSuccess(): void {
    onSuccessCallback?.()
  }

  return (
    <ModalDialog
      isVisible={currentOpenDialog === 'booking-detail-sign-up-success'}
      onClose={handleOnCloseModalSuccess}
      closeOnEscape={false}
      closeOnOutsideClick={false}
      showHeaderCloseButton={false}
      header={tBookingDetailSignUpSuccessDialog('heading')}
      footer={
        <>
          <Button
            variant="primary"
            size="lg"
            onClick={handleOnCloseModalSuccess}
          >
            {tBookingDetailSignUpSuccessDialog('button.continue')}
          </Button>
        </>
      }
    >
      <Heading tag="h3" like="h2-semibold">
        {tBookingDetailSignUpSuccessDialog('heading')}
      </Heading>
      <Text font-size="base-mdt">
        {tBookingDetailSignUpSuccessDialog('subtitle')}
      </Text>
    </ModalDialog>
  )
}
