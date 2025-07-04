import { NextRequest, NextResponse } from 'next/server'

import { mapToSafeBooking } from '@/features/bookings/server/utils/map-to-safe-booking'
import { SafeBooking } from '@/features/bookings/types/booking'
import { BookingsParams } from '@/features/bookings/types/bookings-params'
import { bookingSelect } from '@/features/guest/bookings/server/actions/get-guest-bookings'
import { prisma } from '@/lib/prisma/db'
import { isUserValid } from '@/server/utils/is-valid-user'

export async function GET(
  request: NextRequest,
  { params }: BookingsParams,
): Promise<NextResponse<SafeBooking[] | { error: string }>> {
  const { bookingId, userId } = await params
  if (!bookingId || !userId) {
    return NextResponse.json({ error: 'BAD_REQUEST' }, { status: 400 })
  }

  const isValidUser = await isUserValid(userId)
  if (!isValidUser) {
    return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 })
  }

  try {
    const bookings = await prisma.booking.findMany({
      where: {
        property: {
          hostId: userId,
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
