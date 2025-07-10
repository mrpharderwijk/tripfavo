'use client'

import { parse } from 'date-fns'
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

import { DATE_FORMAT_DB } from '@/constants/dates'
import { OrderEnum } from '@/features/bookings/constants/sort-order'
import { SafeBooking } from '@/features/bookings/types/booking'
import { SortEnum } from '@/features/host/bookings/host-bookings/components/host-bookings-overview/host-bookings-overview'

export type BookingsContextType = {
  order: OrderEnum
  bookings: SafeBooking[]
  setOrder: Dispatch<SetStateAction<OrderEnum>>
  sort: SortEnum
  toggleSort: () => void
}

const BookingsContext = createContext<BookingsContextType | null>(null)

type BookingsContextProviderProps = PropsWithChildren<{
  bookings: SafeBooking[]
}>

export function BookingsContextProvider({
  children,
  bookings,
}: BookingsContextProviderProps): ReactElement {
  const [sort, setSort] = useState<SortEnum>(SortEnum.DESC)
  const [order, setOrder] = useState<OrderEnum>(OrderEnum.DATE)

  const contextValue = useMemo(
    () => ({
      order,
      bookings: !bookings?.length
        ? []
        : bookings.sort((a, b) => {
            const dateA = parse(
              a.createdAt,
              DATE_FORMAT_DB,
              new Date(),
            ).getMilliseconds()
            const dateB = parse(
              b.createdAt,
              DATE_FORMAT_DB,
              new Date(),
            ).getMilliseconds()

            if (sort === SortEnum.ASC) {
              return dateA - dateB
            }
            return dateB - dateA
          }),
      setOrder,
      sort,
      toggleSort: (): void =>
        setSort(sort === SortEnum.ASC ? SortEnum.DESC : SortEnum.ASC),
    }),
    [order, bookings, setOrder, setSort, sort],
  )

  return (
    <BookingsContext.Provider value={contextValue}>
      {children}
    </BookingsContext.Provider>
  )
}

export function useBookingsContext(): BookingsContextType {
  const context = useContext(BookingsContext)
  if (!context) {
    throw new Error(
      'useBookingsContext must be used within a BookingsContextProvider',
    )
  }
  return context
}
