import { NextRequest, NextResponse } from 'next/server'
import { PriceType } from '@prisma/client'

import { getSession } from '@/features/auth/server/actions/get-current-user'
import { HostListingParams } from '@/features/host/types/host-listing-params'
import { prisma } from '@/lib/prisma/db'

type PriceDetail = {
  type: PriceType
  price: number
}

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

  const { priceDetails } = await request.json()
  if (!priceDetails?.length && priceDetails?.length !== 6) {
    return NextResponse.json({ message: 'BAD_REQUEST' }, { status: 400 })
  }

  try {
    const listing = await prisma.listing.update({
      where: {
        userId: session.user.id,
        id: listingId,
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

    return NextResponse.json(listing, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'INTERNAL_SERVER_ERROR' },
      { status: 500 },
    )
  }
}
