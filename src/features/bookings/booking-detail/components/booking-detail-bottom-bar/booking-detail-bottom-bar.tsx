'use client'

import axios from 'axios'
import { useLocale, useTranslations } from 'next-intl'
import { ReactElement, useState } from 'react'
import { PriceType } from '@prisma/client'

import { BottomBar } from '@/components/molecules/bottom-bar/bottom-bar'
import { Button } from '@/components/molecules/buttons/button'
import { datePrices } from '@/data/date-prices'
import { useBookingDetailContext } from '@/features/bookings/booking-detail/providers/booking-detail-context-provider'
import { getCleaningFee } from '@/features/listings/utils/get-cleaning-fee'
import { getDeposit } from '@/features/listings/utils/get-deposit'
import { getHighSeasonPrice } from '@/features/listings/utils/get-high-season-price'
import { getLowSeasonPrice } from '@/features/listings/utils/get-low-season-price'
import { getMidSeasonPrice } from '@/features/listings/utils/get-mid-season-price'
import { useDialogContext } from '@/features/nav-bar/providers/dialog-context-provider'
import { useAppContext } from '@/providers/app-context-provider/app-context-provider'
import { calculateTotalPriceIncludingCleaningFee } from '@/utils/pricing/calculate-total-price'

export function BookingDetailBottomBar(): ReactElement {
  const locale = useLocale()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { currentUser } = useAppContext()
  const tBookingDetailBottomBar = useTranslations('bookingDetail.bottomBar')
  const { listing, selectedDates, totalGuestsAmount, bookingSuccess } =
    useBookingDetailContext()
  const { openDialog } = useDialogContext()
  const totalPrice = calculateTotalPriceIncludingCleaningFee({
    priceDetails: listing.priceDetails,
    startDate: selectedDates?.from,
    endDate: selectedDates?.to,
    datePrices: datePrices,
  })

  async function handleOnClickConfirm(): Promise<void> {
    if (!currentUser) {
      openDialog('booking-login')
      return
    }

    if (
      !currentUser?.id ||
      !selectedDates?.from ||
      !selectedDates?.to ||
      !listing.id ||
      !totalGuestsAmount?.adults ||
      totalPrice < 1 ||
      bookingSuccess
    ) {
      return
    }
    setIsLoading(true)

    try {
      await axios.post('/api/bookings', {
        locale,
        startDate: selectedDates?.from,
        endDate: selectedDates?.to,
        listingId: listing.id,
        userId: currentUser?.id,
        guestsAmount: totalGuestsAmount,
        totalPrice: totalPrice,
        priceDetails: [
          {
            type: PriceType.CLEANING_FEE,
            price: getCleaningFee(listing.priceDetails),
          },
          {
            type: PriceType.DEPOSIT,
            price: getDeposit(listing.priceDetails),
          },
          {
            type: PriceType.HIGH_SEASON,
            price: getHighSeasonPrice(listing.priceDetails),
          },
          {
            type: PriceType.LOW_SEASON,
            price: getLowSeasonPrice(listing.priceDetails),
          },
          {
            type: PriceType.MID_SEASON,
            price: getMidSeasonPrice(listing.priceDetails),
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
