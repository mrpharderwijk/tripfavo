import { getSession } from '@/features/auth/server/actions/get-current-user'
import { GuestReservation } from '@/features/guest/types/guest-reservation'
import { prisma } from '@/lib/prisma/db'
import { ServerActionResponse } from '@/server/utils/error'

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
          roomType: true,
          isMain: true,
          fileName: true,
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

export async function getGuestReservations(): Promise<
  ServerActionResponse<GuestReservation[] | null>
> {
  const session = await getSession()
  if (!session?.user?.id) {
    return { error: 'UNAUTHORIZED' }
  }

  try {
    const reservations = await prisma.reservation.findMany({
      where: {
        userId: session.user.id,
        guestsAmount: {
          isNot: null,
        },
      },
      select: guestReservationSelect,
    })

    return {
      data: reservations.map((reservation) => ({
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
          location: reservation.listing.location ?? { city: '', country: '' },
        },
      })),
    }
  } catch (error: any) {
    return { error: 'INTERNAL_SERVER_ERROR' }
  }
}

export async function getGuestReservationDetail(
  reservationId: string,
): Promise<ServerActionResponse<GuestReservation | null>> {
  const session = await getSession()
  if (!session?.user?.id) {
    return { error: 'UNAUTHORIZED' }
  }

  try {
    const reservation = await prisma.reservation.findFirst({
      where: {
        userId: session.user.id,
        id: reservationId,
      },
      select: guestReservationSelect,
    })

    if (!reservation) {
      return { data: null }
    }

    return {
      data: {
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
          location: reservation.listing.location ?? { city: '', country: '' },
        },
      },
    }
  } catch (error: any) {
    return { error: 'INTERNAL_SERVER_ERROR' }
  }
}
