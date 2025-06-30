import { NextRequest, NextResponse } from 'next/server'

import { getSession } from '@/features/auth/server/actions/get-current-user'
import { GuestsAmount } from '@/features/bookings/booking-detail/providers/booking-detail-context-provider'
import { BookingsParams } from '@/features/bookings/types/bookings-params'
import { EmailGuestBookingRequest } from '@/features/guest/components/email-guest-booking-request/email-guest-booking-request'
import { EmailHostBookingRequest } from '@/features/host/components/email-host-booking-request/email-host-booking-request'
import {
  getPublishedListing,
  publicListingSelect,
} from '@/features/listings/server/actions/get-listings'
import {
  PublicListing,
  PublicListingPriceDetail,
} from '@/features/listings/types/public-listing'
import { Locale } from '@/i18n/config'
import { prisma } from '@/lib/prisma/db'
import { resend } from '@/lib/resend/resend'
import { isActionError } from '@/server/utils/error'

export async function POST(
  request: NextRequest,
  { params }: BookingsParams,
): Promise<NextResponse> {
  const session = await getSession()
  if (!session?.user) {
    return NextResponse.json({ message: 'UNAUTHORIZED' }, { status: 401 })
  }

  const {
    startDate,
    endDate,
    listingId,
    userId,
    guestsAmount,
    totalPrice,
    locale,
    priceDetails,
  } = await (request.json() as Promise<{
    startDate: string
    endDate: string
    listingId: string
    userId: string
    guestsAmount: GuestsAmount
    totalPrice: number
    locale: string
    priceDetails: Omit<PublicListingPriceDetail, 'id'>[]
  }>)

  if (
    !startDate ||
    !endDate ||
    !listingId ||
    !userId ||
    !guestsAmount ||
    !guestsAmount.adults ||
    !totalPrice ||
    !locale ||
    !priceDetails
  ) {
    return NextResponse.json({ message: 'BAD_REQUEST' }, { status: 400 })
  }

  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      select: publicListingSelect,
    })

    // Then create new ListingAmenity records for each amenity
    await prisma.booking.create({
      data: {
        listingId,
        guestId: userId,
        startDate,
        endDate,
        guestsAmount: {
          create: {
            adults: guestsAmount.adults,
            children: guestsAmount.children,
            infants: guestsAmount.infants,
            pets: guestsAmount.pets,
          },
        },
        priceDetails: {
          create: priceDetails
            .filter(
              (
                priceDetail,
              ): priceDetail is typeof priceDetail & {
                type: NonNullable<typeof priceDetail.type>
                price: NonNullable<typeof priceDetail.price>
              } => priceDetail.type !== null && priceDetail.price !== null,
            )
            .map((priceDetail) => ({
              type: priceDetail.type,
              price: priceDetail.price,
            })),
        },
      },
    })

    // Get guest
    const guest = await prisma.user.findUnique({
      where: {
        id: session?.user.id,
      },
      select: {
        name: {
          select: {
            firstName: true,
          },
        },
        profileImage: {
          select: {
            url: true,
          },
        },
        createdAt: true,
        email: true,
      },
    })

    const host = await prisma.user.findUnique({
      where: {
        id: listing?.host.id,
      },
      select: {
        email: true,
      },
    })

    // Then create new ListingAmenity records for each amenity
    const publishedListingResponse = await getPublishedListing(listingId)
    const publishedListing = isActionError(publishedListingResponse)
      ? null
      : publishedListingResponse?.data
    if (!publishedListing) {
      return NextResponse.json({ message: 'BAD_REQUEST' }, { status: 400 })
    }

    // Send email to guest
    const { data, error } = await resend.emails.send({
      from: 'TripFavo <noreply@rocketsciencebv.nl>',
      to: [
        `${process.env.NEXT_PUBLIC_ENV === 'LOCAL' ? process.env.NEXT_PUBLIC_LOCAL_HOST_EMAIL : guest?.email}`,
      ],
      subject: `Your reservation for ${listing?.location?.city}`,
      react: EmailGuestBookingRequest({
        startDate,
        endDate,
        listing: publishedListing as PublicListing,
        guestsAmount,
        totalPrice,
        locale: locale as Locale,
        guest: {
          firstName: guest?.name?.firstName ?? '?',
          profileImageUrl: guest?.profileImage?.url ?? '',
          createdAt: guest?.createdAt?.toISOString() ?? '',
        },
      }),
    })

    // Send email to host
    const { data: hostData, error: hostError } = await resend.emails.send({
      from: 'TripFavo <noreply@rocketsciencebv.nl>',
      to: [
        `${process.env.NEXT_PUBLIC_ENV === 'LOCAL' ? process.env.NEXT_PUBLIC_LOCAL_HOST_EMAIL : host?.email}`,
      ],
      subject: `New booking for ${listing?.location?.streetName}`,
      react: EmailHostBookingRequest({
        startDate,
        endDate,
        listing: publishedListing as PublicListing,
        guestsAmount,
        totalPrice,
        locale: locale as Locale,
        guest: {
          firstName: guest?.name?.firstName ?? '?',
          profileImageUrl: guest?.profileImage?.url ?? '',
          createdAt: guest?.createdAt?.toISOString() ?? '',
        },
      }),
    })

    if (error || hostError) {
      return NextResponse.json({ error, hostError }, { status: 500 })
    }

    return NextResponse.json(
      { message: 'Booking created and email sent successfully' },
      { status: 200 },
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'INTERNAL_SERVER_ERROR' },
      { status: 500 },
    )
  }
}
