import { NextRequest, NextResponse } from 'next/server'

import { getSession } from '@/features/auth/server/actions/get-current-user'
import { EmailGuestReservationRequest } from '@/features/guest/components/email-guest-reservation-request/email-guest-reservation-request'
import { EmailHostReservationRequest } from '@/features/host/components/email-host-reservation-request/email-host-reservation-request'
import {
  getPublishedListing,
  publicListingSelect,
} from '@/features/listings/server/actions/get-listings'
import {
  PublicListing,
  PublicListingPriceDetail,
} from '@/features/listings/types/public-listing'
import { GuestsAmount } from '@/features/reservations/reservation-detail/providers/reservation-detail-context-provider'
import { ReservationsParams } from '@/features/reservations/types/reservation-params'
import { Locales } from '@/i18n/routing'
import { prisma } from '@/lib/prisma/db'
import { resend } from '@/lib/resend/resend'
import { isActionError } from '@/server/utils/error'

export async function POST(
  request: NextRequest,
  { params }: ReservationsParams,
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
    console.log('----> listing: ', listing)

    // Then create new ListingAmenity records for each amenity
    await prisma.reservation.create({
      data: {
        listingId,
        userId,
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
          create: priceDetails.map((priceDetail) => ({
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
        id: listing?.user?.id,
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
      react: EmailGuestReservationRequest({
        startDate,
        endDate,
        listing: publishedListing as PublicListing,
        guestsAmount,
        totalPrice,
        locale: locale as Locales,
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
      subject: `New reservation for ${listing?.location?.streetName}`,
      react: EmailHostReservationRequest({
        startDate,
        endDate,
        listing: publishedListing as PublicListing,
        guestsAmount,
        totalPrice,
        locale: locale as Locales,
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
      { message: 'Reservation created and email sent successfully' },
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
