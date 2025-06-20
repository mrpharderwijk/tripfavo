'use client'

import {
  createContext,
  PropsWithChildren,
  ReactElement,
  useContext,
} from 'react'

import { HostReservation } from '@/features/host/types/host-reservation'

type HostReservationDetailContextType = {
  reservation: HostReservation | null
}

const HostReservationDetailContext =
  createContext<HostReservationDetailContextType | null>(null)

type HostReservationDetailContextProviderProps = PropsWithChildren<{
  reservation: HostReservation | null
}>

export function HostReservationDetailContextProvider({
  children,
  reservation,
}: HostReservationDetailContextProviderProps): ReactElement {
  return (
    <HostReservationDetailContext.Provider
      value={{
        reservation,
      }}
    >
      {children}
    </HostReservationDetailContext.Provider>
  )
}

export function useHostReservationDetailContext(): HostReservationDetailContextType {
  const context = useContext(HostReservationDetailContext)
  if (!context) {
    throw new Error(
      'useHostReservationDetailContext must be used within a HostReservationDetailContextProvider',
    )
  }
  return context
}
