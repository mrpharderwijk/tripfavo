import { createContext, ReactElement, ReactNode, useContext } from 'react'
import { DateRange } from 'react-day-picker'

type DatePrice = {
  startMonth: number
  endMonth: number
  price: number
}

type DatePickerCalendarContextState = {
  selected: DateRange | undefined
  datePrices: DatePrice[]
  getPriceForDate: (date: Date) => number | undefined
}

const DatePickerCalendarContext = createContext<DatePickerCalendarContextState | undefined>(
  undefined,
)

type DatePickerCalendarContextProviderProps = {
  children: ReactNode
  selected: DateRange | undefined
  datePrices: DatePrice[]
  getPriceForDate: (date: Date) => number | undefined
}

export function DatePickerCalendarContextProvider({
  children,
  selected,
  datePrices,
  getPriceForDate,
}: DatePickerCalendarContextProviderProps): ReactElement {
  return (
    <DatePickerCalendarContext.Provider value={{ selected, datePrices, getPriceForDate }}>
      {children}
    </DatePickerCalendarContext.Provider>
  )
}

export function useDatePickerCalendarContext(): DatePickerCalendarContextState {
  const context = useContext(DatePickerCalendarContext)

  if (!context) {
    throw new Error(
      'useDatePickerCalendarContext must be used within a DatePickerCalendarContextProvider',
    )
  }
  return context
}
