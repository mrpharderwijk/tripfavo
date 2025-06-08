'use client'

import { parse } from 'date-fns'
import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { PriceType } from '@prisma/client'

import { calculateTotalPrice } from '@/components/organisms/date-picker-calendar/utils/calculate-total-price'
import { DATE_FORMAT_SEARCH_PARAMS } from '@/constants/dates'
import { datePrices } from '@/data/date-prices'
import { PublicListing } from '@/features/listings/types/public-listing'

export type TotalPricePerNight = {
  nightAmount: number
  pricePerNight: number
  total: number
}

type ReservationDetailContextType = {
  listing: PublicListing
  totalGuestsAmount: GuestsAmount
  updateGuestsAmount: (newGuestsAmount: GuestsAmount) => void
  selectedDates?: DateRange
  updateSelectedDates: (newSelectedDates: DateRange | undefined) => void
  calculateTotalPricePerNight: () => TotalPricePerNight[]
  calculateTotalPriceIncludingCleaningFee: () => number
}

const ReservationDetailContext = createContext<ReservationDetailContextType | null>(null)

export type GuestsAmount = {
  adults: number
  children: number
  infants: number
  pets: number
}

type ReservationDetailContextProviderProps = PropsWithChildren<{
  listing: PublicListing
  startDate: string | null
  endDate: string | null
  guestsAmount: GuestsAmount
}>

export function ReservationDetailContextProvider({
  children,
  listing,
  startDate,
  endDate,
  guestsAmount,
}: ReservationDetailContextProviderProps) {
  const formattedStartDate = startDate
    ? parse(startDate, DATE_FORMAT_SEARCH_PARAMS, new Date())
    : null
  const formattedEndDate = endDate ? parse(endDate, DATE_FORMAT_SEARCH_PARAMS, new Date()) : null
  const [totalGuestsAmount, setTotalGuestsAmount] = useState<GuestsAmount>(guestsAmount)
  const [selectedDates, setSelectedDates] = useState<DateRange | undefined>({
    from: formattedStartDate ?? undefined,
    to: formattedEndDate ?? undefined,
  })

  function updateGuestsAmount(newGuestsAmount: GuestsAmount) {
    setTotalGuestsAmount({ ...guestsAmount, ...newGuestsAmount })
  }

  function updateSelectedDates(newSelectedDates: DateRange | undefined) {
    setSelectedDates(
      newSelectedDates
        ? {
            ...newSelectedDates,
          }
        : undefined,
    )
  }

  function calculateTotalPricePerNight() {
    if (!selectedDates?.from || !selectedDates?.to) {
      return []
    }

    const priceBreakdown: TotalPricePerNight[] = []
    let currentDate = new Date(selectedDates.from)
    let currentPrice: number | null = null
    let nightsAtCurrentPrice = 0

    while (currentDate < selectedDates.to) {
      const month = currentDate.getMonth()
      const price =
        datePrices.find(
          (datePriceRange) =>
            month >= datePriceRange.startMonth && month <= datePriceRange.endMonth,
        )?.price || 0

      if (currentPrice === null) {
        currentPrice = price
        nightsAtCurrentPrice = 1
      } else if (currentPrice === price) {
        nightsAtCurrentPrice++
      } else {
        priceBreakdown.push({
          nightAmount: nightsAtCurrentPrice,
          pricePerNight: currentPrice,
          total: currentPrice * nightsAtCurrentPrice,
        })
        currentPrice = price
        nightsAtCurrentPrice = 1
      }

      currentDate.setDate(currentDate.getDate() + 1)
    }

    if (nightsAtCurrentPrice > 0 && currentPrice !== null) {
      priceBreakdown.push({
        nightAmount: nightsAtCurrentPrice,
        pricePerNight: currentPrice,
        total: currentPrice * nightsAtCurrentPrice,
      })
    }

    return priceBreakdown
  }

  function calculateTotalPriceIncludingCleaningFee() {
    const priceBreakdown = calculateTotalPricePerNight()
    const cleaningFee =
      listing.priceDetails.find((priceDetail) => priceDetail.type === PriceType.CLEANING_FEE)
        ?.amount ?? 0
    return calculateTotalPrice(selectedDates, datePrices) + cleaningFee
  }

  return (
    <ReservationDetailContext.Provider
      value={{
        listing,
        totalGuestsAmount,
        updateGuestsAmount,
        selectedDates,
        updateSelectedDates,
        calculateTotalPricePerNight,
        calculateTotalPriceIncludingCleaningFee,
      }}
    >
      {children}
    </ReservationDetailContext.Provider>
  )
}

export function useReservationDetailContext() {
  const context = useContext(ReservationDetailContext)
  if (!context) {
    throw new Error(
      'useReservationDetailContext must be used within a ReservationDetailContextProvider',
    )
  }
  return context
}
