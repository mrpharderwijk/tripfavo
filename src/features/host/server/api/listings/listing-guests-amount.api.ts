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
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const { listingId } = await params
  if (!listingId) {
    return NextResponse.json(
      { message: 'Listing ID is required' },
      { status: 400 },
    )
  }

  const { maxGuests, adults, children, infants, pets } = await request.json()
  if (
    isNaN(maxGuests) ||
    maxGuests < 0 ||
    isNaN(adults) ||
    adults < 0 ||
    isNaN(children) ||
    isNaN(infants) ||
    isNaN(pets)
  ) {
    return NextResponse.json(
      { message: 'Missing required fields' },
      { status: 400 },
    )
  }

  try {
    const listing = await prisma.listing.update({
      where: {
        userId: session.user.id,
        id: listingId,
      },
      data: {
        guestsAmount: {
          upsert: {
            create: {
              maxGuests,
              adults,
              children,
              infants,
              pets,
            },
            update: {
              maxGuests,
              adults,
              children,
              infants,
              pets,
            },
          },
        },
      },
    })

    return NextResponse.json(listing)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Failed to create structure' },
      { status: 500 },
    )
  }
}
