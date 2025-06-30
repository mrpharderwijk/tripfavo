'use client'

import { useRouter } from 'next/navigation'
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

/**
 * TODO: Add translations
 */
export function BookingDetailSuccessDialog(): ReactElement {
  const { listing } = useBookingDetailContext()
  const { currentOpenDialog, closeDialog } = useDialogContext()
  const router = useRouter()

  function handleOnCloseModalSuccess(): void {
    router.push(`/property/${listing.id}`)
    closeDialog()
  }

  return (
    <ModalDialog
      isVisible={currentOpenDialog === 'booking-success'}
      onClose={handleOnCloseModalSuccess}
      closeOnEscape={false}
      closeOnOutsideClick={false}
      showHeaderCloseButton={false}
      header={<>Booking successful</>}
      footer={
        <>
          <Button
            variant="primary"
            size="lg"
            onClick={handleOnCloseModalSuccess}
          >
            Close
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
            My Bookings
          </ButtonWrapper>
        </>
      }
    >
      <Heading tag="h3" like="h2-semibold">
        Your reservation has been send to the host
      </Heading>
      <Text font-size="base-mdt">
        You will receive a confirmation email with the complete summary details
        of your reservation. The host will review your request within 48 hours.
        You can check the status of your reservation in your account.
      </Text>
    </ModalDialog>
  )
}
