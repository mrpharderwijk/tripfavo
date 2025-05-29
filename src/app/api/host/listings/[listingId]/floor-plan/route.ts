import { NextRequest, NextResponse } from 'next/server'

import { getSession } from '@/actions/get-current-user'
import { HostListingParams } from '@/features/host/types/host-listing-params'
import { prisma } from '@/lib/prisma/db'

export async function POST(request: NextRequest, { params }: HostListingParams) {
  const session = await getSession()
  if (!session?.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const { listingId } = await params
  if (!listingId) {
    return NextResponse.json({ message: 'Listing ID is required' }, { status: 400 })
  }

  const { guestCount, roomCount, bedroomCount, bedCount, bathroomCount } = await request.json()
  if (!guestCount || !roomCount || !bedroomCount || !bedCount || !bathroomCount) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
  }

  try {
    const listing = await prisma.listing.update({
      where: {
        userId: session.user.id,
        id: listingId,
      },
      data: {
        floorPlan: {
          upsert: {
            create: {
              roomCount,
              bedroomCount,
              bedCount,
              bathroomCount,
              guestCount,
            },
            update: {
              roomCount,
              bedroomCount,
              bedCount,
              bathroomCount,
              guestCount,
            },
          },
        },
      },
    })

    return NextResponse.json(listing)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Failed to create structure' }, { status: 500 })
  }
}
