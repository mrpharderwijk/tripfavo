import { NextRequest, NextResponse } from 'next/server'

import { getSession } from '@/features/auth/server/actions/get-current-user'
import { HostListingParams } from '@/features/host/types/host-listing-params'
import { prisma } from '@/lib/prisma/db'

export async function POST(
  request: NextRequest,
  { params }: HostListingParams,
): Promise<NextResponse> {
  const session = await getSession()
  if (!session?.user) {
    return NextResponse.json({ message: 'UNAUTHORIZED' }, { status: 401 })
  }

  const { listingId } = await params
  if (!listingId) {
    return NextResponse.json({ message: 'BAD_REQUEST' }, { status: 400 })
  }

  const {
    country,
    province,
    city,
    streetName,
    houseNumber,
    postalCode,
    additionalInfo,
    aptInfo,
    latitude,
    longitude,
  } = await request.json()
  if (
    !country ||
    !province ||
    !city ||
    !streetName ||
    !houseNumber ||
    !postalCode ||
    !latitude ||
    !longitude
  ) {
    return NextResponse.json({ message: 'BAD_REQUEST' }, { status: 400 })
  }

  try {
    const listing = await prisma.listing.update({
      where: {
        userId: session.user.id,
        id: listingId,
      },
      data: {
        location: {
          upsert: {
            create: {
              country,
              province,
              city,
              streetName,
              houseNumber,
              postalCode,
              additionalInfo,
              aptInfo,
              latitude,
              longitude,
            },
            update: {
              country,
              province,
              city,
              streetName,
              houseNumber,
              postalCode,
              additionalInfo,
              aptInfo,
              latitude,
              longitude,
            },
          },
        },
      },
    })

    return NextResponse.json(listing)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'INTERNAL_SERVER_ERROR' },
      { status: 500 },
    )
  }
}
