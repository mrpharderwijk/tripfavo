import { getSession } from '@/features/auth/server/actions/get-current-user'
import { bookingSelect } from '@/features/bookings/server/actions/get-bookings'
import { mapToSafeBooking } from '@/features/bookings/server/utils/map-to-safe-booking'
import { SafeBooking } from '@/features/bookings/types/booking'
import { prisma } from '@/lib/prisma/db'
import { ServerActionResponse } from '@/server/utils/error'

export async function getGuestBookings(): Promise<
  ServerActionResponse<SafeBooking[] | null>
> {
  const session = await getSession()
  if (!session?.user?.id) {
    return { error: 'UNAUTHORIZED' }
  }

  try {
    const bookings = await prisma.booking.findMany({
      where: {
        userId: session.user.id,
        guestsAmount: {
          isNot: null,
        },
      },
      select: bookingSelect,
    })

    const safeBookings = mapToSafeBooking(bookings)

    return { data: safeBookings }
  } catch (error: any) {
    return { error: 'INTERNAL_SERVER_ERROR' }
  }
}

export async function getGuestBookingDetail(
  bookingId: string,
): Promise<ServerActionResponse<SafeBooking | null>> {
  const session = await getSession()
  if (!session?.user?.id) {
    return { error: 'UNAUTHORIZED' }
  }

  try {
    const booking = await prisma.booking.findFirst({
      where: {
        userId: session.user.id,
        id: bookingId,
      },
      select: bookingSelect,
    })

    if (!booking) {
      return { data: null }
    }

    return {
      data: {
        id: booking.id,
        startDate: booking.startDate,
        endDate: booking.endDate,
        status: booking.status,
        guestsAmount: {
          adults: booking.guestsAmount!.adults ?? 0,
          children: booking.guestsAmount!.children ?? 0,
          infants: booking.guestsAmount!.infants ?? 0,
          pets: booking.guestsAmount!.pets ?? 0,
        },
        listing: {
          id: booking.listing.id,
          title: booking.listing.title ?? '',
          images: booking.listing.images.map((img) => ({
            fileName: img.fileName ?? '',
            url: img.url ?? '',
            isMain: img.isMain ?? false,
          })),
          location: {
            city: booking.listing.location?.city ?? '',
            country: booking.listing.location?.country ?? '',
          },
        },
        priceDetails: booking.priceDetails
          .filter((pd) => pd.type !== null)
          .map((pd) => ({
            id: pd.id,
            createdAt: pd.createdAt,
            updatedAt: pd.updatedAt,
            price: pd.price,
            type: pd.type!,
          })),
        createdAt: booking.createdAt.toISOString(),
        updatedAt: booking.updatedAt.toISOString(),
      },
    }
  } catch (error: any) {
    return { error: 'INTERNAL_SERVER_ERROR' }
  }
}
