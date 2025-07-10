'use client'

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  ReactElement,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react'
import { DateRange } from 'react-day-picker'

import { DatePrice } from '@/components/organisms/date-picker-calendar/providers/date-picker-calendar-context-provider'
import { getCalendarPrices } from '@/components/organisms/date-picker-calendar/utils/get-calendar-prices'
import { PublicProperty } from '@/features/properties/types/public-property'

type PropertyDetailContextType = {
  calendarPrices: DatePrice[]
  property: PublicProperty
  selectedDateRange: DateRange | undefined
  setSelectedDateRange: Dispatch<SetStateAction<DateRange | undefined>>
}

const PropertyDetailContext = createContext<PropertyDetailContextType | null>(
  null,
)

type PropertyDetailContextProviderProps = PropsWithChildren<{
  property: PublicProperty
}>

export function PropertyDetailContextProvider({
  children,
  property,
}: PropertyDetailContextProviderProps): ReactElement {
  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >(undefined)
  const calendarPrices = useMemo(
    () => getCalendarPrices(property.priceDetails),
    [property],
  )
  const value = useMemo(() => {
    return {
      calendarPrices,
      property,
      selectedDateRange,
      setSelectedDateRange,
    }
  }, [calendarPrices, property, selectedDateRange, setSelectedDateRange])

  return (
    <PropertyDetailContext.Provider value={value}>
      {children}
    </PropertyDetailContext.Provider>
  )
}

export function usePropertyDetailContext(): PropertyDetailContextType {
  const context = useContext(PropertyDetailContext)
  if (!context) {
    throw new Error(
      'usePropertyDetailContext must be used within a PropertyDetailContextProvider',
    )
  }
  return context
}
