'use client'

import { parse } from 'date-fns'
import {
  createContext,
  PropsWithChildren,
  ReactElement,
  useContext,
  useState,
} from 'react'
import { DateRange } from 'react-day-picker'

import { DATE_FORMAT_SEARCH_PARAMS } from '@/constants/dates'
import { PublicProperty } from '@/features/properties/types/public-property'

export type TotalPricePerNight = {
  nightAmount: number
  pricePerNight: number
  total: number
}

type BookingDetailContextType = {
  property: PublicProperty
  totalGuestsAmount: GuestsAmount
  updateGuestsAmount: (newGuestsAmount: GuestsAmount) => void
  selectedDates?: DateRange
  updateSelectedDates: (newSelectedDates: DateRange | undefined) => void
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
  startDate: string | null
  endDate: string | null
  guestsAmount: GuestsAmount
}>

export function BookingDetailContextProvider({
  children,
  property,
  startDate,
  endDate,
  guestsAmount,
}: BookingDetailContextProviderProps): ReactElement {
  const formattedStartDate = startDate
    ? parse(startDate, DATE_FORMAT_SEARCH_PARAMS, new Date())
    : null
  const formattedEndDate = endDate
    ? parse(endDate, DATE_FORMAT_SEARCH_PARAMS, new Date())
    : null
  const [totalGuestsAmount, setTotalGuestsAmount] =
    useState<GuestsAmount>(guestsAmount)
  const [selectedDates, setSelectedDates] = useState<DateRange | undefined>({
    from: formattedStartDate ?? undefined,
    to: formattedEndDate ?? undefined,
  })
  const [bookingSuccess, setBookingSuccess] = useState(false)

  function updateGuestsAmount(newGuestsAmount: GuestsAmount): void {
    setTotalGuestsAmount({ ...guestsAmount, ...newGuestsAmount })
  }

  function updateSelectedDates(newSelectedDates: DateRange | undefined): void {
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
