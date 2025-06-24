'use client'

import {
  createContext,
  PropsWithChildren,
  ReactElement,
  useContext,
} from 'react'

import { SafeBooking } from '@/features/bookings/types/booking'

type HostBookingDetailContextType = {
  booking: SafeBooking | null
}

const HostBookingDetailContext =
  createContext<HostBookingDetailContextType | null>(null)

type HostBookingDetailContextProviderProps = PropsWithChildren<{
  booking: SafeBooking | null
}>

export function HostBookingDetailContextProvider({
  children,
  booking,
}: HostBookingDetailContextProviderProps): ReactElement {
  return (
    <HostBookingDetailContext.Provider
      value={{
        booking,
      }}
    >
      {children}
    </HostBookingDetailContext.Provider>
  )
}

export function useHostBookingDetailContext(): HostBookingDetailContextType {
  const context = useContext(HostBookingDetailContext)
  if (!context) {
    throw new Error(
      'useHostBookingDetailContext must be used within a HostBookingDetailContextProvider',
    )
  }
  return context
}
