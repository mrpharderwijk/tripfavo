'use client'

import NextLink from 'next/link'
import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { Button } from '@/components/molecules/buttons/button'
import { ButtonWrapper } from '@/components/molecules/buttons/button-wrapper/button-wrapper'
import { HeadingGroup } from '@/components/molecules/heading/heading'
import { ModalDialog } from '@/components/molecules/modal-dialog/modal-dialog'
import { useDialogContext } from '@/features/nav-bar/providers/dialog-context-provider'
import { getRoutePathByRouteName } from '@/utils/get-route'

export function BookingDetailSuccessDialog(): ReactElement {
  const { currentOpenDialog, closeDialog } = useDialogContext()
  const tBookingDetailSuccessDialog = useTranslations(
    'bookingDetail.successDialog',
  )

  return (
    <ModalDialog
      isVisible={currentOpenDialog === 'booking-detail-success'}
      header={tBookingDetailSuccessDialog('heading')}
      footer={
        <>
          <Button variant="primary" size="md" onClick={closeDialog}>
            {tBookingDetailSuccessDialog('button.close')}
          </Button>
          <ButtonWrapper
            variant="secondary"
            size="xl"
            renderRoot={({ buttonContent }) => (
              <NextLink
                href={getRoutePathByRouteName('guestBookings')}
                passHref
              >
                {buttonContent}
              </NextLink>
            )}
          >
            {tBookingDetailSuccessDialog('button.myBookings')}
          </ButtonWrapper>
        </>
      }
    >
      <HeadingGroup
        title={tBookingDetailSuccessDialog('heading')}
        subtitle={tBookingDetailSuccessDialog('subtitle')}
      />
    </ModalDialog>
  )
}
