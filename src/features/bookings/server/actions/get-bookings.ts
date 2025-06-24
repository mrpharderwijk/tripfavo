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
  createdAt: true,
  updatedAt: true,
}

export async function getBookings(): Promise<
  ServerActionResponse<SafeBooking[] | null>
> {
  const session = await getSession()
  if (!session?.user?.id) {
    return { error: 'UNAUTHORIZED' }
  }

  try {
    const bookings: DbBooking[] = await prisma.booking.findMany({
      where: {
        userId: session.user.id,
      },
      select: bookingSelect,
    })

    const safeBooking = mapToSafeBooking(bookings)

    return { data: safeBooking }
  } catch (error) {
    return { error: 'INTERNAL_SERVER_ERROR' }
  }
}
