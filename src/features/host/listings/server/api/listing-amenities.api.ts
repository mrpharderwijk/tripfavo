import { NextRequest, NextResponse } from 'next/server'
import { AmenityType } from '@prisma/client'

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

  const { amenities } = await request.json()
  if (!amenities) {
    return NextResponse.json(
      { message: 'Amenities are required' },
      { status: 400 },
    )
  }

  try {
    // First, delete all existing amenities for this listing
    await prisma.listingAmenity.deleteMany({
      where: { listingId },
    })

    // Then create new ListingAmenity records for each amenity
    await prisma.listing.update({
      where: { id: listingId },
      data: {
        amenities: {
          create: amenities.map((amenity: AmenityType) => ({
            type: amenity,
          })),
        },
      },
    })

    return NextResponse.json(
      { message: 'Amenities updated successfully' },
      { status: 200 },
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    )
  }
}
