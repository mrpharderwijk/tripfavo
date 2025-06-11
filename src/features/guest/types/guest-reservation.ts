import { ReservationStatus } from '@prisma/client'

export type GuestReservation = {
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
      url: string
      isMain: boolean
    }[]
    location: {
      city: string
      country: string
    }
  }
}
