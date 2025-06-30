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
    return NextResponse.json({ message: 'UNAUTHORIZED' }, { status: 401 })
  }

  const { listingId } = await params
  if (!listingId) {
    return NextResponse.json({ message: 'BAD_REQUEST' }, { status: 400 })
  }

  const { structure } = await request.json()
  if (!structure) {
    return NextResponse.json({ message: 'BAD_REQUEST' }, { status: 400 })
  }

  try {
    const listing = await prisma.listing.update({
      where: {
        hostId: session.user.id,
        id: listingId,
      },
      data: {
        structure,
      },
    })

    return NextResponse.json(listing)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'INTERNAL_SERVER_ERROR' },
      { status: 500 },
    )
  }
}
