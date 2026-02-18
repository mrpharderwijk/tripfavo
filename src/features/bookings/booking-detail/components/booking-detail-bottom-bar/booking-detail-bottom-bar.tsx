'use client'

import axios from 'axios'
import { useLocale, useTranslations } from 'next-intl'
import { ReactElement, useState } from 'react'

import { BottomBar } from '@/components/molecules/bottom-bar/bottom-bar'
import { Button } from '@/components/molecules/buttons/button'
import { BookingDetailHostSelfDialog } from '@/features/bookings/booking-detail/components/booking-detail-host-self-dialog/booking-detail-host-self-dialog'
import { useBookingDetailContext } from '@/features/bookings/booking-detail/providers/booking-detail-context-provider'
import { useDialogContext } from '@/features/nav-bar/providers/dialog-context-provider'
import { useAppContext } from '@/providers/app-context-provider/app-context-provider'

export function BookingDetailBottomBar(): ReactElement {
  const locale = useLocale()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { currentUser } = useAppContext()
  const tBookingDetailBottomBar = useTranslations('bookingDetail.bottomBar')
  const { property, selectedDates, totalGuestsAmount, bookingSuccess } =
    useBookingDetailContext()
  const { openDialog } = useDialogContext()

  async function handleOnClickConfirm(): Promise<void> {
    if (!currentUser) {
      openDialog('login')
      return
    }

    if (!property?.host?.id || currentUser.id === property.host.id) {
      openDialog('booking-detail-host-self')
      return
    }

    if (
      !currentUser?.id ||
      !selectedDates?.from ||
      !selectedDates?.to ||
      !property.id ||
      !totalGuestsAmount?.adults ||
      bookingSuccess
    ) {
      return
    }
    setIsLoading(true)

    try {
      await axios.post(`/api/guest/${currentUser.id}/bookings`, {
        locale,
        startDate: selectedDates?.from,
        endDate: selectedDates?.to,
        propertyId: property.id,
        userId: currentUser?.id,
        guestsAmount: totalGuestsAmount,
      })

      openDialog('booking-detail-success')
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <BottomBar>
      <Button
        variant="secondary"
        size="lg"
        onClick={handleOnClickConfirm}
        fullWidth
        disabled={bookingSuccess}
        loading={isLoading}
      >
        {tBookingDetailBottomBar('button.label')}
      </Button>

      {/* Booking host self */}
      <BookingDetailHostSelfDialog />
    </BottomBar>
  )
}
