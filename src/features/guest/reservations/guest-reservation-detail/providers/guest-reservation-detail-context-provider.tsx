'use client'

import {
  createContext,
  PropsWithChildren,
  ReactElement,
  useContext,
} from 'react'

import { GuestReservation } from '@/features/guest/types/guest-reservation'

export type TotalPricePerNight = {
  nightAmount: number
  pricePerNight: number
  total: number
}

type GuestReservationDetailContextType = {
  reservation: GuestReservation | null
}

const GuestReservationDetailContext =
  createContext<GuestReservationDetailContextType | null>(null)

export type GuestsAmount = {
  adults: number
  children: number
  infants: number
  pets: number
}

type GuestReservationDetailContextProviderProps = PropsWithChildren<{
  reservation: GuestReservation | null
}>

export function GuestReservationDetailContextProvider({
  children,
  reservation,
}: GuestReservationDetailContextProviderProps): ReactElement {
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
  // const [reservationSuccess, setReservationSuccess] = useState(false)

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
    <GuestReservationDetailContext.Provider
      value={{
        reservation,
      }}
    >
      {children}
    </GuestReservationDetailContext.Provider>
  )
}

export function useGuestReservationDetailContext(): GuestReservationDetailContextType {
  const context = useContext(GuestReservationDetailContext)
  if (!context) {
    throw new Error(
      'useGuestReservationDetailContext must be used within a GuestReservationDetailContextProvider',
    )
  }
  return context
}
