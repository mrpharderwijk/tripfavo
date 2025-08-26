'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'
import { BookingStatus } from '@prisma/client'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Body } from '@/components/atoms/typography/body/body'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { BottomBar } from '@/components/molecules/bottom-bar/bottom-bar'
import { Button } from '@/components/molecules/buttons/button'
import { ModalDialog } from '@/components/molecules/modal-dialog/modal-dialog'
import { useHostBookingDetailContext } from '@/features/host/bookings/host-booking-detail/providers/host-booking-detail-context-provider'
import { useDialogContext } from '@/features/nav-bar/providers/dialog-context-provider'

export function HostBookingDetailBottomBar(): ReactElement {
  const { booking } = useHostBookingDetailContext()
  const { openDialog, closeDialog, currentOpenDialog } = useDialogContext()
  const tHostBookingDetail = useTranslations('host.bookings.bookingDetail')
  const router = useRouter()

  function handleCancelBooking(): void {
    openDialog('booking-cancel')
  }

  function handleApproveBooking(): void {
    openDialog('booking-approve')
  }

  async function handleConfirmApproveBooking(): Promise<void> {
    try {
      const response = await axios.patch(
        `/api/host/${booking?.property.host.id}/bookings/${booking?.id}`,
      )
      closeDialog()
      router.refresh()
    } catch (error) {
      console.error(error)
    } finally {
      closeDialog()
    }
  }

  return (
    <BottomBar fixed={false}>
      <Button
        variant="primary"
        size="lg"
        fullWidth
        onClick={handleCancelBooking}
      >
        {tHostBookingDetail('decline')}
      </Button>

      {booking?.status === BookingStatus.PENDING && (
        <Button
          variant="secondary"
          size="lg"
          fullWidth
          onClick={handleApproveBooking}
        >
          {tHostBookingDetail('approve')}
        </Button>
      )}

      <ModalDialog
        isVisible={
          !!currentOpenDialog && currentOpenDialog === 'booking-approve'
        }
        onClose={closeDialog}
        header={
          <Heading tag="h2" like="h4-semibold">
            {tHostBookingDetail('approveDialog.heading')}
          </Heading>
        }
        footer={
          <FlexBox flex-direction="row" gap={6} align-items="center">
            <Button variant="primary-link" size="md" onClick={closeDialog}>
              {tHostBookingDetail('approveDialog.close')}
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={handleConfirmApproveBooking}
            >
              {tHostBookingDetail('approveDialog.confirm')}
            </Button>
          </FlexBox>
        }
      >
        <Body size="base-lg" color="primary" text-align="center">
          {tHostBookingDetail('approveDialog.description')}
        </Body>
      </ModalDialog>
    </BottomBar>
  )
}
