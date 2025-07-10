import { NextRequest, NextResponse } from 'next/server'
import { AmenityType } from '@prisma/client'

import { HostPropertyParams } from '@/features/host/properties/types/host-property-params'
import { prisma } from '@/lib/prisma/db'
import { isUserValid } from '@/server/utils/is-valid-user'

export async function POST(
  request: NextRequest,
  { params }: HostPropertyParams,
): Promise<NextResponse> {
  const { propertyId, userId } = await params
  if (!propertyId || !userId) {
    return NextResponse.json({ error: 'BAD_REQUEST' }, { status: 400 })
  }

  const isValidUser = await isUserValid(userId)
  if (!isValidUser) {
    return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 })
  }

  const { amenities } = await request.json()
  if (!amenities) {
    return NextResponse.json(
      { message: 'Amenities are required' },
      { status: 400 },
    )
  }

  try {
    // First, delete all existing amenities for this property
    await prisma.propertyAmenity.deleteMany({
      where: { propertyId },
    })

    // Then create new PropertyAmenity records for each amenity
    await prisma.property.update({
      where: { id: propertyId },
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
