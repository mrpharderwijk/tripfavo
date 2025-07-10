'use client'

import {
  createContext,
  PropsWithChildren,
  ReactElement,
  useContext,
} from 'react'

import { SafeBooking } from '@/features/bookings/types/booking'

export type TotalPricePerNight = {
  nightAmount: number
  pricePerNight: number
  total: number
}

type GuestBookingDetailContextType = {
  booking: SafeBooking | null
}

const GuestBookingDetailContext =
  createContext<GuestBookingDetailContextType | null>(null)

export type GuestsAmount = {
  adults: number
  children: number
  infants: number
  pets: number
}

type GuestBookingDetailContextProviderProps = PropsWithChildren<{
  booking: SafeBooking | null
}>

export function GuestBookingDetailContextProvider({
  children,
  booking,
}: GuestBookingDetailContextProviderProps): ReactElement {
  // const formattedStartDate = startDate
  //   ? parse(startDate, DATE_FORMAT_SEARCH_PARAMS, new Date())
  //   : null
  // const formattedEndDate = endDate
  //   ? parse(endDate, DATE_FORMAT_SEARCH_PARAMS, new Date())
  //   : null
  // const [totalGuestsAmount, setTotalGuestsAmount] =
  //   useState<GuestsAmount>(guestsAmount)
  // const [selectedDates, setSelectedDates] = useState<DateRange | undefined>({
  //   from: formattedStartDate ?? undefined,
  //   to: formattedEndDate ?? undefined,
  // })
  // const [bookingSuccess, setBookingSuccess] = useState(false)

  // function updateGuestsAmount(newGuestsAmount: GuestsAmount): void {
  //   setTotalGuestsAmount({ ...guestsAmount, ...newGuestsAmount })
  // }

  // function updateSelectedDates(newSelectedDates: DateRange | undefined): void {
  //   setSelectedDates(
  //     newSelectedDates
  //       ? {
  //           ...newSelectedDates,
  //         }
  //       : undefined,
  //   )
  // }

  return (
    <GuestBookingDetailContext.Provider
      value={{
        booking,
      }}
    >
      {children}
    </GuestBookingDetailContext.Provider>
  )
}

export function useGuestBookingDetailContext(): GuestBookingDetailContextType {
  const context = useContext(GuestBookingDetailContext)
  if (!context) {
    throw new Error(
      'useGuestBookingDetailContext must be used within a GuestBookingDetailContextProvider',
    )
  }
  return context
}
