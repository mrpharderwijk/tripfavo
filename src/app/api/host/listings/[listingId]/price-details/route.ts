import { NextRequest, NextResponse } from 'next/server'
import { PriceType } from '@prisma/client'

import { getSession } from '@/actions/get-current-user'
import { HostListingParams } from '@/features/host/types/host-listing-params'
import { prisma } from '@/lib/prisma/db'

type PriceDetail = {
  type: PriceType
  amount: number
}

export async function POST(request: NextRequest, { params }: HostListingParams) {
  const session = await getSession()
  if (!session?.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const { listingId } = await params
  if (!listingId) {
    return NextResponse.json({ message: 'Listing ID is required' }, { status: 400 })
  }

  const { priceDetails } = await request.json()
  if (!priceDetails?.length && priceDetails?.length !== 5) {
    return NextResponse.json({ message: 'Price details are required' }, { status: 400 })
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
            amount: priceDetail.amount,
          })),
        },
      },
    })

    return NextResponse.json(listing, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Failed to create price' }, { status: 500 })
  }
}
