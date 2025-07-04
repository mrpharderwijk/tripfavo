import { mapToSafeBooking } from '@/features/bookings/server/utils/map-to-safe-booking'
import { SafeBooking } from '@/features/bookings/types/booking'
import { prisma } from '@/lib/prisma/db'
import { ServerActionResponse } from '@/server/utils/error'

export const bookingSelect = {
  id: true,
  startDate: true,
  endDate: true,
  status: true,
  guestsAmount: {
    select: {
      adults: true,
      children: true,
      infants: true,
      pets: true,
    },
  },
  guest: {
    select: {
      id: true,
      email: true,
      name: true,
      profileImage: {
        select: {
          url: true,
          fileName: true,
        },
      },
      createdAt: true,
    },
  },
  property: {
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
          streetName: true,
          houseNumber: true,
          postalCode: true,
          latitude: true,
          longitude: true,
        },
      },
      host: {
        select: {
          id: true,
          email: true,
          name: true,
          profileImage: {
            select: {
              url: true,
              fileName: true,
            },
          },
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
  createdAt: true,
  updatedAt: true,
}

export async function getGuestBookings({
  userId,
}: {
  userId?: string
}): Promise<ServerActionResponse<SafeBooking[] | null>> {
  if (!userId) {
    return { error: 'UNAUTHORIZED' }
  }

  try {
    const bookings = await prisma.booking.findMany({
      where: {
        guestId: userId,
        guestsAmount: {
          isNot: null,
        },
      },
      select: bookingSelect,
    })

    const safeBookings =
      bookings
        ?.map((booking) => mapToSafeBooking(booking))
        .filter((booking): booking is SafeBooking => booking !== null) ?? []

    return { data: safeBookings }
  } catch (error: any) {
    return { error: 'INTERNAL_SERVER_ERROR' }
  }
}

export async function getGuestBookingDetail({
  bookingId,
  userId,
}: {
  bookingId?: string
  userId?: string
}): Promise<ServerActionResponse<SafeBooking | null>> {
  if (!userId) {
    return { error: 'UNAUTHORIZED' }
  }

  if (!bookingId) {
    return { error: 'BAD_REQUEST' }
  }

  try {
    const booking = await prisma.booking.findFirst({
      where: {
        guestId: userId,
        id: bookingId,
      },
      select: bookingSelect,
    })

    if (!booking) {
      return { data: null }
    }

    const safeBooking = mapToSafeBooking(booking)

    return { data: safeBooking }
  } catch (error: any) {
    return { error: 'INTERNAL_SERVER_ERROR' }
  }
}
