import { getSession } from '@/features/auth/server/actions/get-current-user'
import { mapToSafeBooking } from '@/features/bookings/server/utils/map-to-safe-booking'
import { DbBooking, SafeBooking } from '@/features/bookings/types/booking'
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

export async function getBookings(): Promise<
  ServerActionResponse<SafeBooking[]>
> {
  const session = await getSession()
  if (!session?.user?.id) {
    return { error: 'UNAUTHORIZED' }
  }

  try {
    const bookings: DbBooking[] = await prisma.booking.findMany({
      where: {
        guestId: session.user.id,
      },
      select: bookingSelect,
    })

    const safeBooking =
      bookings
        ?.map((booking) => mapToSafeBooking(booking))
        .filter((booking): booking is SafeBooking => booking !== null) ?? []

    return { data: safeBooking }
  } catch (error) {
    return { error: 'INTERNAL_SERVER_ERROR' }
  }
}
