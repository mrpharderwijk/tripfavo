'use client'

import { createContext, PropsWithChildren, useContext } from 'react'

import { PublicListing } from '@/features/listings/types/public-listing'

type ListingDetailContextType = {
  listing: PublicListing
}

const ListingDetailContext = createContext<ListingDetailContextType | null>(null)

type ListingDetailContextProviderProps = PropsWithChildren<{
  listing: PublicListing
}>

export function ListingDetailContextProvider({
  children,
  listing,
}: ListingDetailContextProviderProps) {
  return (
    <ListingDetailContext.Provider value={{ listing }}>{children}</ListingDetailContext.Provider>
  )
}

export function useListingDetailContext() {
  const context = useContext(ListingDetailContext)
  if (!context) {
    throw new Error('useListingDetailContext must be used within a ListingDetailContextProvider')
  }
  return context
}
