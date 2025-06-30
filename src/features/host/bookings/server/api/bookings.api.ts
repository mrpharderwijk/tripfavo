import { NextResponse } from 'next/server'

import { getSession } from '@/features/auth/server/actions/get-current-user'
import { bookingSelect } from '@/features/bookings/server/actions/get-bookings'
import { mapToSafeBooking } from '@/features/bookings/server/utils/map-to-safe-booking'
import { SafeBooking } from '@/features/bookings/types/booking'
import { prisma } from '@/lib/prisma/db'

export async function GET(): Promise<
  NextResponse<SafeBooking[] | { error: string }>
> {
  const session = await getSession()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 })
  }

  try {
    const bookings = await prisma.booking.findMany({
      where: {
        listing: {
          hostId: session.user.id,
        },
      },
      select: bookingSelect,
    })

    const safeBookings =
      bookings
        ?.map((booking) => mapToSafeBooking(booking))
        .filter((booking): booking is SafeBooking => booking !== null) ?? []

    return NextResponse.json(safeBookings)
  } catch (error: any) {
    return NextResponse.json(
      { error: 'INTERNAL_SERVER_ERROR' },
      { status: 500 },
    )
  }
}
