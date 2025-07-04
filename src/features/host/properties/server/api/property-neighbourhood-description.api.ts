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

  const { neighbourhoodDescription } = await request.json()
  if (!neighbourhoodDescription) {
    return NextResponse.json({ message: 'BAD_REQUEST' }, { status: 400 })
  }

  try {
    const property = await prisma.property.update({
      where: {
        hostId: userId,
        id: propertyId,
      },
      data: {
        neighbourhoodDescription,
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
