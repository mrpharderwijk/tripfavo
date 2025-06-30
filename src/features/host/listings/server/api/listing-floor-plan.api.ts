import { NextRequest, NextResponse } from 'next/server'

import { getSession } from '@/features/auth/server/actions/get-current-user'
import { HostListingParams } from '@/features/host/listings/types/host-listing-params'
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

  const { rooms, bedrooms, beds, bathrooms, livingRooms, kitchens } =
    await request.json()
  if (!rooms || !bedrooms || !beds || !bathrooms || !livingRooms || !kitchens) {
    return NextResponse.json(
      { message: 'Missing required fields' },
      { status: 400 },
    )
  }

  try {
    const listing = await prisma.listing.update({
      where: {
        hostId: session.user.id,
        id: listingId,
      },
      data: {
        floorPlan: {
          upsert: {
            create: {
              rooms,
              bedrooms,
              beds,
              bathrooms,
              livingRooms,
              kitchens,
            },
            update: {
              rooms,
              bedrooms,
              beds,
              bathrooms,
              livingRooms,
              kitchens,
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
