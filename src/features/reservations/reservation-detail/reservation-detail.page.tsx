'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { Divider } from '@/components/atoms/layout/divider/divider'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { PublicListing } from '@/features/listings/types/public-listing'
import { ReservationDetailBottomBar } from '@/features/reservations/reservation-detail/components/reservation-detail-bottom-bar/reservation-detail-bottom-bar'
import { ReservationDetailListing } from '@/features/reservations/reservation-detail/components/reservation-detail-listing/reservation-detail-listing'
import { ReservationDetailPriceBreakdown } from '@/features/reservations/reservation-detail/components/reservation-detail-price-breakdown/reservation-detail-price-breakdown'
import { ReservationDetailSummary } from '@/features/reservations/reservation-detail/components/reservation-detail-summary/reservation-detail-summary'
import { ReservationDetailContextProvider } from '@/features/reservations/reservation-detail/providers/reservation-detail-context-provider'
import { ModalDialog } from '@/components/molecules/modal-dialog/modal-dialog'
import { useDialogContext } from '@/features/nav-bar/providers/dialog-context-provider'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { Text } from '@/components/atoms/typography/text/text'
import { Button } from '@/components/molecules/buttons/button'

type ReservationDetailPageProps = {
  listing: PublicListing
}

export function ReservationDetailPage({ listing }: ReservationDetailPageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')
  const adultsAmount = searchParams.get('adults')
  const childrenAmount = searchParams.get('children')
  const infantsAmount = searchParams.get('infants')
  const petsAmount = searchParams.get('pets')
  const { currentOpenDialog, closeDialog } = useDialogContext()

  function handleOnCloseModalSuccess() {
    router.push(`/property/${listing.id}`)
    closeDialog('reservation-success')
  }

  return (
    <ReservationDetailContextProvider
      listing={listing}
      startDate={startDate}
      endDate={endDate}
      guestsAmount={{
        adults: Number(adultsAmount ?? 1),
        children: Number(childrenAmount ?? 0),
        infants: Number(infantsAmount ?? 0),
        pets: Number(petsAmount ?? 0),
      }}
    >
      <FlexBox flex-direction="col" gap={6} padding-x={6} padding-t={6}>
        <ReservationDetailListing />
        <Divider />

        <ReservationDetailSummary />
        <Divider />

        <ReservationDetailPriceBreakdown />
        <Divider />

        {/* TODO: OPTIONAL */}
        {/* <ReservationDetailCancellationDetails /> */}

        <ReservationDetailBottomBar />

        <ModalDialog
          isVisible={currentOpenDialog === 'reservation-success'}
          onClose={handleOnCloseModalSuccess}
          closeOnEscape={false}
          closeOnOutsideClick={false}
          showHeaderCloseButton={false}
          header={<>Reservation successful</>}
          footer={
            <>
              <Button variant="primary" size="lg" onClick={handleOnCloseModalSuccess}>
                Close
              </Button>
              <Button variant="secondary" size="lg" onClick={handleOnCloseModalSuccess}>My Reservations</Button>
            </>
          }
        >
          <Heading tag="h3" like="h2-semibold">Your reservation has been send to the host</Heading>
          <Text font-size="base-mdt">You will receive a confirmation email with the complete summary details of your reservation. The host will review your request within 48 hours. You can check the status of your reservation in your account.</Text>
        </ModalDialog>
      </FlexBox>
    </ReservationDetailContextProvider>
  )
}
