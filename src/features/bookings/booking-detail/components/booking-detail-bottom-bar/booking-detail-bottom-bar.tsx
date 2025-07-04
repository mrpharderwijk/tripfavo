'use client'

import axios from 'axios'
import { useLocale, useTranslations } from 'next-intl'
import { ReactElement, useState } from 'react'
import { PriceType } from '@prisma/client'

import { BottomBar } from '@/components/molecules/bottom-bar/bottom-bar'
import { Button } from '@/components/molecules/buttons/button'
import { datePrices } from '@/data/date-prices'
import { useBookingDetailContext } from '@/features/bookings/booking-detail/providers/booking-detail-context-provider'
import { useDialogContext } from '@/features/nav-bar/providers/dialog-context-provider'
import { getCleaningFee } from '@/features/properties/utils/get-cleaning-fee'
import { getDeposit } from '@/features/properties/utils/get-deposit'
import { getHighSeasonPrice } from '@/features/properties/utils/get-high-season-price'
import { getLowSeasonPrice } from '@/features/properties/utils/get-low-season-price'
import { getMidSeasonPrice } from '@/features/properties/utils/get-mid-season-price'
import { useAppContext } from '@/providers/app-context-provider/app-context-provider'
import { calculateTotalPriceIncludingCleaningFee } from '@/utils/pricing/calculate-total-price'

export function BookingDetailBottomBar(): ReactElement {
  const locale = useLocale()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { currentUser } = useAppContext()
  const tBookingDetailBottomBar = useTranslations('bookingDetail.bottomBar')
  const { property, selectedDates, totalGuestsAmount, bookingSuccess } =
    useBookingDetailContext()
  const { openDialog } = useDialogContext()
  const totalPrice = calculateTotalPriceIncludingCleaningFee({
    priceDetails: property.priceDetails,
    startDate: selectedDates?.from,
    endDate: selectedDates?.to,
    datePrices: datePrices,
  })

  async function handleOnClickConfirm(): Promise<void> {
    if (!currentUser) {
      openDialog('booking-login')
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
      totalPrice < 1 ||
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
        totalPrice: totalPrice,
        priceDetails: [
          {
            type: PriceType.CLEANING_FEE,
            price: getCleaningFee(property.priceDetails),
          },
          {
            type: PriceType.DEPOSIT,
            price: getDeposit(property.priceDetails),
          },
          {
            type: PriceType.HIGH_SEASON,
            price: getHighSeasonPrice(property.priceDetails),
          },
          {
            type: PriceType.LOW_SEASON,
            price: getLowSeasonPrice(property.priceDetails),
          },
          {
            type: PriceType.MID_SEASON,
            price: getMidSeasonPrice(property.priceDetails),
          },
        ],
      })

      openDialog('booking-success')
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
    </BottomBar>
  )
}
