import { BookingStatus, PriceType, Prisma } from '@prisma/client'

import { bookingSelect } from '@/features/bookings/server/actions/get-bookings'

export type DbBooking = Prisma.BookingGetPayload<{
  select: typeof bookingSelect
}>

export type SafeBooking = {
  id: string
  startDate: Date
  endDate: Date
  status: BookingStatus
  guestsAmount: {
    adults: number
    children: number
    infants: number
    pets: number
  }
  listing: {
    id: string
    title: string
    images: {
      fileName: string
      url: string
      isMain: boolean
    }[]
    location: {
      city: string
      country: string
    }
  }
  priceDetails: {
    id: string
    createdAt: Date
    updatedAt: Date
    price: number
    type: PriceType
  }[]
  createdAt: string
  updatedAt: string
}
