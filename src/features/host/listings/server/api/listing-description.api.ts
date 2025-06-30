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

  const { description } = await request.json()
  if (!description) {
    return NextResponse.json(
      { message: 'Description is required' },
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
        description,
      },
    })

    return NextResponse.json(listing)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Failed to create description' },
      { status: 500 },
    )
  }
}
