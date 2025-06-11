import { getSession } from '@/actions/get-current-user'
import { GuestReservation } from '@/features/guest/types/guest-reservation'
import { prisma } from '@/lib/prisma/db'

export const guestReservationGuestsAmountSelect = {
  select: {
    adults: true,
    children: true,
    infants: true,
    pets: true,
  },
}

export const guestReservationSelect = {
  createdAt: true,
  endDate: true,
  updatedAt: true,
  id: true,
  startDate: true,
  status: true,
  guestsAmount: guestReservationGuestsAmountSelect,
  listing: {
    select: {
      id: true,
      title: true,
      images: {
        select: {
          url: true,
          isMain: true,
        },
      },
      location: {
        select: {
          city: true,
          country: true,
        },
      },
    },
  },
}
export async function getGuestReservations(): Promise<GuestReservation[] | null> {
  const session = await getSession()
  if (!session?.user?.id) {
    return null
  }

  try {
    const reservations = await prisma.reservation.findMany({
      where: {
        userId: session.user.id,
        guestsAmount: {
          isNot: null
        }
      },
      select: guestReservationSelect,
    })

    return reservations.map(reservation => ({
      ...reservation,
      guestsAmount: {
        adults: reservation.guestsAmount?.adults ?? 0,
        children: reservation.guestsAmount?.children ?? 0,
        infants: reservation.guestsAmount?.infants ?? 0,
        pets: reservation.guestsAmount?.pets ?? 0,
      },
      listing: {
        ...reservation.listing,
        title: reservation.listing.title ?? '',
        location: reservation.listing.location ?? { city: '', country: '' }
      }
    }))
  } catch (error: any) {
    return null
  }
}
