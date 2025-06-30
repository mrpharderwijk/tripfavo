import { BookingStatus, PriceType, Prisma } from '@prisma/client'

import { bookingSelect } from '@/features/bookings/server/actions/get-bookings'

export type DbBooking = Prisma.BookingGetPayload<{
  select: typeof bookingSelect
}>

export type SafeBooking = {
  id: string
  startDate: string
  endDate: string
  status: BookingStatus
  guestsAmount: {
    adults: number
    children: number
    infants: number
    pets: number
  }
  guest: {
    id: string
    name: {
      firstName: string
      middleName: string
      lastName: string
    } | null
    profileImage: {
      url: string
      fileName: string
    } | null
    createdAt: string
  } | null
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
    host: {
      id: string
      name: {
        firstName: string
        middleName: string
        lastName: string
      } | null
      profileImage: {
        url: string
        fileName: string
      }
    }
  }
  priceDetails: {
    id: string
    createdAt: string
    updatedAt: string
    price: number
    type: PriceType
  }[]
  createdAt: string
  updatedAt: string
}
