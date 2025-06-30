import { NextRequest, NextResponse } from 'next/server'

import { calculateTotalPrice } from '@/components/organisms/date-picker-calendar/utils/calculate-total-price'
import { GuestsAmount } from '@/features/bookings/booking-detail/providers/booking-detail-context-provider'
import { bookingSelect } from '@/features/bookings/server/actions/get-bookings'
import { BookingsParams } from '@/features/bookings/types/bookings-params'
import { EmailGuestBookingApproval } from '@/features/guest/components/email-guest-booking-approval/email-guest-booking-approval'
import { EmailHostBookingApproval } from '@/features/host/components/email-host-booking-approval.tsx/email-host-booking-approval'
import { SafeHostListing } from '@/features/host/listings/types/safe-host-listing'
import { Locale } from '@/i18n/config'
import { prisma } from '@/lib/prisma/db'
import { resend } from '@/lib/resend/resend'
import { isUserValid } from '@/server/utils/is-valid-user'
import { mapPricesToDatePrices } from '@/utils/pricing/map-prices-to-date-prices'

export async function PATCH(
  request: NextRequest,
  { params }: BookingsParams,
): Promise<NextResponse> {
  const { bookingId, userId } = await params
  if (!bookingId || !userId) {
    return NextResponse.json({ error: 'BAD_REQUEST' }, { status: 400 })
  }

  const isValidUser = await isUserValid(userId)
  if (!isValidUser) {
    return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 })
  }

  try {
    const booking = await prisma.booking.findUnique({
      where: {
        id: bookingId,
        listing: {
          hostId: userId,
        },
      },
      select: bookingSelect,
    })

    if (!booking) {
      return NextResponse.json(
        { error: 'INTERNAL_SERVER_ERROR' },
        { status: 500 },
      )
    }

    const updatedBooking = await prisma.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        status: 'CONFIRMED',
      },
    })

    // Send email to guest
    const calculatedTotalPrice = calculateTotalPrice({
      startDate: booking?.startDate,
      endDate: booking?.endDate,
      datePrices: mapPricesToDatePrices(booking?.priceDetails),
    })

    const { data, error } = await resend.emails.send({
      from: 'TripFavo <noreply@rocketsciencebv.nl>',
      to: [
        `${process.env.NEXT_PUBLIC_ENV === 'LOCAL' ? process.env.NEXT_PUBLIC_LOCAL_HOST_EMAIL : booking?.guest?.email}`,
      ],
      subject: `Booking approved for ${booking?.listing?.location?.city}`,
      react: EmailGuestBookingApproval({
        startDate: booking?.startDate.toISOString(),
        endDate: booking?.endDate.toISOString(),
        listing: booking?.listing as SafeHostListing,
        guestsAmount: booking?.guestsAmount as GuestsAmount,
        totalPrice: calculatedTotalPrice,
        datePrices: mapPricesToDatePrices(booking?.priceDetails),
        priceDetails: booking?.priceDetails,
        locale: 'en' as Locale,
        guest: {
          firstName: booking?.guest?.name?.firstName ?? '?',
          profileImageUrl: booking?.guest?.profileImage?.url ?? '',
          createdAt: booking?.guest?.createdAt?.toISOString() ?? '',
        },
      }),
    })

    // Send email to host
    const { data: hostData, error: hostError } = await resend.emails.send({
      from: 'TripFavo <noreply@rocketsciencebv.nl>',
      to: [
        `${process.env.NEXT_PUBLIC_ENV === 'LOCAL' ? process.env.NEXT_PUBLIC_LOCAL_HOST_EMAIL : booking?.listing?.host?.email}`,
      ],
      subject: `Booking approved for ${booking.listing?.location?.streetName} ${booking.listing?.location?.houseNumber}`,
      react: EmailHostBookingApproval({
        startDate: booking?.startDate.toISOString(),
        endDate: booking?.endDate.toISOString(),
        listing: booking?.listing as SafeHostListing,
        guestsAmount: booking?.guestsAmount as GuestsAmount,
        totalPrice: calculatedTotalPrice,
        datePrices: mapPricesToDatePrices(booking?.priceDetails),
        priceDetails: booking?.priceDetails,
        locale: 'en' as Locale,
        guest: {
          firstName: booking?.guest?.name?.firstName ?? '?',
          profileImageUrl: booking?.guest?.profileImage?.url ?? '',
          createdAt: booking?.guest?.createdAt?.toISOString() ?? '',
        },
      }),
    })

    return NextResponse.json({ bookingId: updatedBooking.id })
  } catch (error) {
    return NextResponse.json(
      { error: 'INTERNAL_SERVER_ERROR' },
      { status: 500 },
    )
  }
}
