import { getSession } from '@/features/auth/server/actions/get-current-user'
import { HostReservation } from '@/features/host/types/host-reservation'
import { prisma } from '@/lib/prisma/db'
import { ServerActionResponse } from '@/server/utils/error'

export const hostReservationSelect = {
  id: true,
  startDate: true,
  endDate: true,
  status: true,
  guestsAmount: true,
  user: {
    select: {
      id: true,
      name: true,
      profileImage: {
        select: {
          url: true,
          fileName: true,
        },
      },
    },
  },
  listing: {
    select: {
      id: true,
      title: true,
      images: {
        select: {
          fileName: true,
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
  priceDetails: {
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      price: true,
      type: true,
    },
  },
}

export async function getHostReservations(): Promise<
  ServerActionResponse<HostReservation[] | null>
> {
  const session = await getSession()
  if (!session?.user?.id) {
    return { error: 'UNAUTHORIZED' }
  }

  try {
    const reservations = await prisma.reservation.findMany({
      where: {
        listing: {
          userId: session.user.id,
        },
      },
      select: hostReservationSelect,
    })

    const transformedReservations = reservations.map((reservation) => ({
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
      priceDetails: reservation.priceDetails
        .filter((detail) => detail.type !== null)
        .map((detail) => ({
          ...detail,
          type: detail.type!,
        })),
    }))

    return { data: transformedReservations ?? null }
  } catch (error: any) {
    return { error: 'INTERNAL_SERVER_ERROR' }
  }
}

export async function getHostReservationDetail(
  reservationId: string,
): Promise<ServerActionResponse<HostReservation | null>> {
  const session = await getSession()
  if (!session?.user?.id) {
    return { error: 'UNAUTHORIZED' }
  }

  try {
    const reservation = await prisma.reservation.findUnique({
      where: {
        id: reservationId,
        listing: {
          userId: session.user.id,
        },
      },
      select: hostReservationSelect,
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
        priceDetails: reservation.priceDetails
          .filter((detail) => detail.type !== null)
          .map((detail) => ({
            ...detail,
            type: detail.type!,
          })),
      },
    }
  } catch (error: any) {
    return { error: 'INTERNAL_SERVER_ERROR' }
  }
}
