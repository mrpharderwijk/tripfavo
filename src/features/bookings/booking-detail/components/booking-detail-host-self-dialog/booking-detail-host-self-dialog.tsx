'use client'

import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { Heading } from '@/components/atoms/typography/heading/heading'
import { Text } from '@/components/atoms/typography/text/text'
import { Button } from '@/components/molecules/buttons/button'
import { ModalDialog } from '@/components/molecules/modal-dialog/modal-dialog'
import { useDialogContext } from '@/features/nav-bar/providers/dialog-context-provider'

export function BookingDetailHostSelfDialog(): ReactElement {
  const { currentOpenDialog, closeDialog } = useDialogContext()
  const tBookingDetailHostSelfDialog = useTranslations(
    'bookingDetail.hostSelfDialog',
  )

  return (
    <ModalDialog
      isVisible={currentOpenDialog === 'booking-detail-host-self'}
      header={tBookingDetailHostSelfDialog('heading')}
      footer={
        <Button variant="secondary" size="lg" onClick={closeDialog}>
          {tBookingDetailHostSelfDialog('button.close')}
        </Button>
      }
    >
      <Heading tag="h3" like="h2-semibold">
        {tBookingDetailHostSelfDialog('title')}
      </Heading>
      <Text font-size="base-mdt">
        {tBookingDetailHostSelfDialog('subtitle')}
      </Text>
    </ModalDialog>
  )
}
