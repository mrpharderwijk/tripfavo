'use client'

import {
  createContext,
  PropsWithChildren,
  ReactElement,
  useContext,
  useState,
} from 'react'

import { PublicProperty } from '@/features/properties/types/public-property'

export type DateRangeView = {
  from?: string
  to?: string
}

export type TotalPricePerNight = {
  nightAmount: number
  pricePerNight: number
  total: number
}

type BookingDetailContextType = {
  property: PublicProperty
  totalGuestsAmount: GuestsAmount
  updateGuestsAmount: (newGuestsAmount: GuestsAmount) => void
  selectedDates?: DateRangeView
  updateSelectedDates: (newSelectedDates: DateRangeView | undefined) => void
  bookingSuccess: boolean
  setBookingSuccess: (newBookingSuccess: boolean) => void
}

const BookingDetailContext = createContext<BookingDetailContextType | null>(
  null,
)

export type GuestsAmount = {
  adults: number
  children: number
  infants: number
  pets: number
}

type BookingDetailContextProviderProps = PropsWithChildren<{
  property: PublicProperty
  startDate?: string
  endDate?: string
  guestsAmount: GuestsAmount
}>

export function BookingDetailContextProvider({
  children,
  property,
  startDate,
  endDate,
  guestsAmount,
}: BookingDetailContextProviderProps): ReactElement {
  const [totalGuestsAmount, setTotalGuestsAmount] =
    useState<GuestsAmount>(guestsAmount)
  const [selectedDates, setSelectedDates] = useState<DateRangeView | undefined>(
    { from: startDate, to: endDate },
  )
  const [bookingSuccess, setBookingSuccess] = useState(false)

  function updateGuestsAmount(newGuestsAmount: GuestsAmount): void {
    setTotalGuestsAmount({ ...guestsAmount, ...newGuestsAmount })
  }

  function updateSelectedDates(
    newSelectedDates: DateRangeView | undefined,
  ): void {
    setSelectedDates(
      newSelectedDates
        ? {
            ...newSelectedDates,
          }
        : undefined,
    )
  }

  return (
    <BookingDetailContext.Provider
      value={{
        property,
        totalGuestsAmount,
        updateGuestsAmount,
        selectedDates,
        updateSelectedDates,
        bookingSuccess,
        setBookingSuccess,
      }}
    >
      {children}
    </BookingDetailContext.Provider>
  )
}

export function useBookingDetailContext(): BookingDetailContextType {
  const context = useContext(BookingDetailContext)
  if (!context) {
    throw new Error(
      'useBookingDetailContext must be used within a BookingDetailContextProvider',
    )
  }
  return context
}
