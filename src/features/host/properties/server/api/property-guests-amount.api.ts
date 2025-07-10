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
    const property = await prisma.property.update({
      where: {
        hostId: userId,
        id: propertyId,
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

    return NextResponse.json(property)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Failed to create structure' },
      { status: 500 },
    )
  }
}
