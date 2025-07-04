'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { Heading } from '@/components/atoms/typography/heading/heading'
import { Text } from '@/components/atoms/typography/text/text'
import { Button } from '@/components/molecules/buttons/button'
import { ButtonWrapper } from '@/components/molecules/buttons/button-wrapper/button-wrapper'
import { ModalDialog } from '@/components/molecules/modal-dialog/modal-dialog'
import { useBookingDetailContext } from '@/features/bookings/booking-detail/providers/booking-detail-context-provider'
import { useDialogContext } from '@/features/nav-bar/providers/dialog-context-provider'
import { Link } from '@/i18n/navigation'
import { getRoutePathByRouteName } from '@/utils/get-route'

export function BookingDetailSuccessDialog(): ReactElement {
  const { property } = useBookingDetailContext()
  const { currentOpenDialog, closeDialog } = useDialogContext()
  const router = useRouter()
  const tBookingDetailSuccessDialog = useTranslations(
    'bookingDetail.successDialog',
  )

  function handleOnCloseModalSuccess(): void {
    router.push(`/property/${property.id}`)
    closeDialog()
  }

  return (
    <ModalDialog
      isVisible={currentOpenDialog === 'booking-success'}
      onClose={handleOnCloseModalSuccess}
      closeOnEscape={false}
      closeOnOutsideClick={false}
      showHeaderCloseButton={false}
      header={tBookingDetailSuccessDialog('heading')}
      footer={
        <>
          <Button
            variant="primary"
            size="lg"
            onClick={handleOnCloseModalSuccess}
          >
            {tBookingDetailSuccessDialog('button.close')}
          </Button>
          <ButtonWrapper
            variant="secondary"
            size="lg"
            onClick={handleOnCloseModalSuccess}
            renderRoot={({ buttonContent }) => (
              <Link href={getRoutePathByRouteName('guestBookings')}>
                {buttonContent}
              </Link>
            )}
          >
            {tBookingDetailSuccessDialog('button.myBookings')}
          </ButtonWrapper>
        </>
      }
    >
      <Heading tag="h3" like="h2-semibold">
        {tBookingDetailSuccessDialog('heading')}
      </Heading>
      <Text font-size="base-mdt">
        {tBookingDetailSuccessDialog('subtitle')}
      </Text>
    </ModalDialog>
  )
}
