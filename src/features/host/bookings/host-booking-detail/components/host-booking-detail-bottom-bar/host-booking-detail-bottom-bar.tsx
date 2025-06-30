'use client'

import axios from 'axios'
import { ReactElement } from 'react'

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

  function handleCancelBooking(): void {
    openDialog('booking-cancel')
  }

  function handleApproveBooking(): void {
    openDialog('booking-approve')
  }

  async function handleConfirmApproveBooking(): Promise<void> {
    try {
      const response = await axios.patch(
        `/api/host/${booking?.listing.host.id}/bookings/${booking?.id}`,
      )
      closeDialog()
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
        Cancel booking
      </Button>

      <Button
        variant="secondary"
        size="lg"
        fullWidth
        onClick={handleApproveBooking}
      >
        Approve booking
      </Button>

      <ModalDialog
        isVisible={
          !!currentOpenDialog && currentOpenDialog === 'booking-approve'
        }
        onClose={closeDialog}
        header={
          <Heading tag="h2" like="h4-semibold">
            Confirm booking
          </Heading>
        }
        footer={
          <FlexBox flex-direction="row" gap={6} align-items="center">
            <Button variant="primary-link" size="md" onClick={closeDialog}>
              close
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={handleConfirmApproveBooking}
            >
              Approve booking
            </Button>
          </FlexBox>
        }
      >
        <Body size="base-lg" color="primary" text-align="center">
          Are you sure you want to approve this booking?
        </Body>
      </ModalDialog>
    </BottomBar>
  )
}
