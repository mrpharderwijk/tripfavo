'use client'

import { createContext, PropsWithChildren, useContext } from 'react'

import { PublicListing } from '@/features/listings/types/public-listing'

type ReservationDetailContextType = {
  listing: PublicListing
  startDate: string | null
  endDate: string | null
}

const ReservationDetailContext = createContext<ReservationDetailContextType | null>(null)

type ReservationDetailContextProviderProps = PropsWithChildren<{
  listing: PublicListing
  startDate: string | null
  endDate: string | null
}>

export function ReservationDetailContextProvider({
  children,
  listing,
  startDate,
  endDate,
}: ReservationDetailContextProviderProps) {
  return (
    <ReservationDetailContext.Provider value={{ listing, startDate, endDate }}>
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
