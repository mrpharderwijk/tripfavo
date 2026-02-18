import { isValid } from 'date-fns'
import { NextRequest, NextResponse } from 'next/server'
import { PriceType } from '@prisma/client'

import { datePrices } from '@/data/date-prices'
import { GuestsAmount } from '@/features/bookings/booking-detail/providers/booking-detail-context-provider'
import { BookingsParams } from '@/features/bookings/types/bookings-params'
import { EmailGuestBookingRequest } from '@/features/guest/components/email-guest-booking-request/email-guest-booking-request'
import { EmailHostBookingRequest } from '@/features/host/components/email-host-booking-request/email-host-booking-request'
import {
  getPublishedProperty,
  publicPropertySelect,
} from '@/features/properties/server/actions/get-properties'
import {
  PublicProperty,
  PublicPropertyPriceDetail,
} from '@/features/properties/types/public-property'
import { getCleaningFee } from '@/features/properties/utils/get-cleaning-fee'
import { getDeposit } from '@/features/properties/utils/get-deposit'
import { getHighSeasonPrice } from '@/features/properties/utils/get-high-season-price'
import { getLowSeasonPrice } from '@/features/properties/utils/get-low-season-price'
import { getMidSeasonPrice } from '@/features/properties/utils/get-mid-season-price'
import { Locale } from '@/i18n/config'
import { prisma } from '@/lib/prisma/db'
import { resend } from '@/lib/resend/resend'
import { isActionError } from '@/server/utils/error'
import { isUserValid } from '@/server/utils/is-valid-user'
import { formatSelectedDates } from '@/utils/date/format-selected-dates'
import { calculateTotalPriceIncludingCleaningFee } from '@/utils/pricing/calculate-total-price'

export async function POST(
  request: NextRequest,
  { params }: BookingsParams,
): Promise<NextResponse> {
  const { userId } = await params
  if (!userId) {
    return NextResponse.json({ error: 'BAD_REQUEST' }, { status: 400 })
  }

  const isValidUser = await isUserValid(userId)
  if (!isValidUser) {
    return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 })
  }

  const {
    startDate,
    endDate,
    propertyId,
    guestsAmount,
    totalPrice,
    locale,
    priceDetails,
  } = await (request.json() as Promise<{
    startDate: string
    endDate: string
    propertyId: string
    userId: string
    guestsAmount: GuestsAmount
    totalPrice: number
    locale: string
    priceDetails: Omit<PublicPropertyPriceDetail, 'id'>[]
  }>)

  if (
    !startDate ||
    !endDate ||
    !propertyId ||
    !userId ||
    !guestsAmount ||
    !guestsAmount.adults ||
    !locale
  ) {
    return NextResponse.json({ message: 'BAD_REQUEST' }, { status: 400 })
  }

  try {
    const property = await prisma.property.findUnique({
      where: {
        id: propertyId,
      },
      select: publicPropertySelect,
    })

    if (!property || (property?.host?.id && userId === property?.host?.id)) {
      return NextResponse.json({ error: 'BAD_REQUEST' }, { status: 400 })
    }

    const { from: fromDate, to: toDate } = formatSelectedDates({
      selectedDates: { from: startDate, to: endDate },
    })

    if (!fromDate || !toDate || !isValid(fromDate) || !isValid(toDate)) {
      console.log('fromDate: ', fromDate)
      return NextResponse.json({ error: 'BAD_REQUEST' }, { status: 400 })
    }

    const priceDetails = [
      {
        type: PriceType.CLEANING_FEE,
        price: getCleaningFee(property.priceDetails),
      },
      {
        type: PriceType.DEPOSIT,
        price: getDeposit(property.priceDetails),
      },
      {
        type: PriceType.HIGH_SEASON,
        price: getHighSeasonPrice(property.priceDetails),
      },
      {
        type: PriceType.LOW_SEASON,
        price: getLowSeasonPrice(property.priceDetails),
      },
      {
        type: PriceType.MID_SEASON,
        price: getMidSeasonPrice(property.priceDetails),
      },
    ]

    const totalPrice = calculateTotalPriceIncludingCleaningFee({
      priceDetails,
      startDate: fromDate,
      endDate: toDate,
      datePrices: datePrices,
    })

    console.log(
      'priceDetails -----> : ',
      priceDetails
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
    )

    // Then create new PropertyAmenity records for each amenity
    await prisma.booking.create({
      data: {
        propertyId,
        guestId: userId,
        startDate: fromDate as Date,
        endDate: toDate as Date,
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

    // Get guest to add to booking
    const guest = await prisma.user.findUnique({
      where: {
        id: userId,
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

    // Get host to add to booking
    const host = await prisma.user.findUnique({
      where: {
        id: property?.host.id,
      },
      select: {
        email: true,
      },
    })

    // Get published property to add to booking
    const publishedPropertyResponse = await getPublishedProperty(propertyId)
    const publishedProperty = isActionError(publishedPropertyResponse)
      ? null
      : publishedPropertyResponse?.data
    if (!publishedProperty) {
      return NextResponse.json({ message: 'BAD_REQUEST' }, { status: 400 })
    }

    // Send email to guest
    const { data, error } = await resend.emails.send({
      from: 'TripFavo <noreply@rocketsciencebv.nl>',
      to: [
        `${process.env.NEXT_PUBLIC_ENV === 'LOCAL' ? process.env.NEXT_PUBLIC_LOCAL_HOST_EMAIL : guest?.email}`,
      ],
      subject: `Your booking for ${property?.location?.city}`,
      react: EmailGuestBookingRequest({
        startDate,
        endDate,
        property: publishedProperty as PublicProperty,
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
      subject: `New booking for ${property?.location?.streetName}`,
      react: EmailHostBookingRequest({
        startDate,
        endDate,
        property: publishedProperty as PublicProperty,
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
