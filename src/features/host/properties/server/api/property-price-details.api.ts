import { NextRequest, NextResponse } from 'next/server'
import { PriceType } from '@prisma/client'

import { HostPropertyParams } from '@/features/host/properties/types/host-property-params'
import { prisma } from '@/lib/prisma/db'
import { isUserValid } from '@/server/utils/is-valid-user'

type PriceDetail = {
  type: PriceType
  price: number
}

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

  const { priceDetails } = await request.json()
  if (!priceDetails?.length && priceDetails?.length !== 6) {
    return NextResponse.json({ message: 'BAD_REQUEST' }, { status: 400 })
  }

  try {
    const property = await prisma.property.update({
      where: {
        hostId: userId,
        id: propertyId,
      },
      data: {
        priceDetails: {
          deleteMany: {},
          create: priceDetails.map((priceDetail: PriceDetail) => ({
            type: priceDetail.type,
            price: priceDetail.price,
          })),
        },
      },
    })

    return NextResponse.json(property, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'INTERNAL_SERVER_ERROR' },
      { status: 500 },
    )
  }
}
