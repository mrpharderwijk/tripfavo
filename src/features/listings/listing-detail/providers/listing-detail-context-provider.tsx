'use client'

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react'
import { DateRange } from 'react-day-picker'

import { DatePrice } from '@/components/organisms/date-picker-calendar/providers/date-picker-calendar-context-provider'
import { getCalendarPrices } from '@/components/organisms/date-picker-calendar/utils/get-calendar-prices'
import { PublicListing } from '@/features/listings/types/public-listing'

type ListingDetailContextType = {
  calendarPrices: DatePrice[]
  listing: PublicListing
  selectedDateRange: DateRange | undefined
  setSelectedDateRange: Dispatch<SetStateAction<DateRange | undefined>>
}

const ListingDetailContext = createContext<ListingDetailContextType | null>(null)

type ListingDetailContextProviderProps = PropsWithChildren<{
  listing: PublicListing
}>

export function ListingDetailContextProvider({
  children,
  listing,
}: ListingDetailContextProviderProps) {
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange | undefined>(undefined)
  const calendarPrices = useMemo(() => getCalendarPrices(listing.priceDetails), [listing])
  const value = useMemo(() => {
    return {
      calendarPrices,
      listing,
      selectedDateRange,
      setSelectedDateRange,
    }
  }, [calendarPrices, listing, selectedDateRange, setSelectedDateRange])

  return <ListingDetailContext.Provider value={value}>{children}</ListingDetailContext.Provider>
}

export function useListingDetailContext() {
  const context = useContext(ListingDetailContext)
  if (!context) {
    throw new Error('useListingDetailContext must be used within a ListingDetailContextProvider')
  }
  return context
}
