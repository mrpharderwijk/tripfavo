import { getSession } from '@/features/auth/server/actions/get-current-user'
import { bookingSelect } from '@/features/bookings/server/actions/get-bookings'
import { mapToSafeBooking } from '@/features/bookings/server/utils/map-to-safe-booking'
import { SafeBooking } from '@/features/bookings/types/booking'
import { prisma } from '@/lib/prisma/db'
import { ServerActionResponse } from '@/server/utils/error'

export async function getHostBookings(): Promise<
  ServerActionResponse<SafeBooking[]>
> {
  const session = await getSession()
  if (!session?.user?.id) {
    return { error: 'UNAUTHORIZED' }
  }

  try {
    const bookings = await prisma.booking.findMany({
      where: {
        listing: {
          host: {
            id: session.user.id,
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
  reservationId: string,
): Promise<ServerActionResponse<SafeBooking | null>> {
  const session = await getSession()
  if (!session?.user?.id) {
    return { error: 'UNAUTHORIZED' }
  }

  try {
    const booking = await prisma.booking.findUnique({
      where: {
        id: reservationId,
        listing: {
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
