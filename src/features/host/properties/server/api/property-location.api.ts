import { NextRequest, NextResponse } from 'next/server'

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
    const property = await prisma.property.update({
      where: {
        hostId: userId,
        id: propertyId,
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

    return NextResponse.json(property)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'INTERNAL_SERVER_ERROR' },
      { status: 500 },
    )
  }
}
