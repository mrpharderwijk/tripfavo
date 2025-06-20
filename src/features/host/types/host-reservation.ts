import { PriceType, ReservationStatus } from '@prisma/client'

export type HostReservation = {
  id: string
  startDate: Date
  endDate: Date
  status: ReservationStatus
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
}
