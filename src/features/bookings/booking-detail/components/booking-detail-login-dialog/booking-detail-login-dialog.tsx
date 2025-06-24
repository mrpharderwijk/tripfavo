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
export function BookingDetailLoginDialog(): ReactElement {
  const { listing } = useBookingDetailContext()
  const { currentOpenDialog, closeDialog } = useDialogContext()
  const router = useRouter()

  function handleOnCloseModalSuccess(): void {
    router.push(`/property/${listing.id}`)
    closeDialog('booking-login')
  }

  return (
    <ModalDialog
      isVisible={currentOpenDialog === 'booking-login'}
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
        To place a booking, you need to be logged in
      </Heading>
      <Text font-size="base-mdt">
        You are required to be logged in to place a booking. If you don't have
        an account, you can create one by providing your email address.
      </Text>
    </ModalDialog>
  )
}
