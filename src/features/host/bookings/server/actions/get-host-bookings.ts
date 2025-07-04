import { getSession } from '@/features/auth/server/actions/get-current-user'
import { mapToSafeBooking } from '@/features/bookings/server/utils/map-to-safe-booking'
import { SafeBooking } from '@/features/bookings/types/booking'
import { bookingSelect } from '@/features/guest/bookings/server/actions/get-guest-bookings'
import { prisma } from '@/lib/prisma/db'
import { ServerActionResponse } from '@/server/utils/error'
import { isUserValid } from '@/server/utils/is-valid-user'

export async function getHostBookings({
  userId,
}: {
  userId?: string
}): Promise<ServerActionResponse<SafeBooking[]>> {
  if (!userId) {
    return { error: 'UNAUTHORIZED' }
  }

  const isValidUser = await isUserValid(userId)
  if (!isValidUser) {
    return { error: 'UNAUTHORIZED' }
  }

  try {
    const bookings = await prisma.booking.findMany({
      where: {
        property: {
          host: {
            id: userId,
          },
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

export async function getHostBooking(
  bookingId: string,
): Promise<ServerActionResponse<SafeBooking | null>> {
  const session = await getSession()
  if (!session?.user?.id) {
    return { error: 'UNAUTHORIZED' }
  }

  try {
    const booking = await prisma.booking.findUnique({
      where: {
        id: bookingId,
        property: {
          host: {
            id: session.user.id,
          },
        },
      },
      select: bookingSelect,
    })

    if (!booking) {
      return { data: null }
    }

    const safeBookings = mapToSafeBooking(booking)
    return { data: safeBookings }
  } catch (error: any) {
    return { error: 'INTERNAL_SERVER_ERROR' }
  }
}
