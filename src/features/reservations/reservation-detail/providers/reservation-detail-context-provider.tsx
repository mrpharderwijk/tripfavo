'use client'

import { parse } from 'date-fns'
import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { DateRange } from 'react-day-picker'

import { DATE_FORMAT_SEARCH_PARAMS } from '@/constants/dates'
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
  reservationSuccess: boolean
  setReservationSuccess: (newReservationSuccess: boolean) => void
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
  const [reservationSuccess, setReservationSuccess] = useState(false)

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

  return (
    <ReservationDetailContext.Provider
      value={{
        listing,
        totalGuestsAmount,
        updateGuestsAmount,
        selectedDates,
        updateSelectedDates,
        reservationSuccess,
        setReservationSuccess,
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
