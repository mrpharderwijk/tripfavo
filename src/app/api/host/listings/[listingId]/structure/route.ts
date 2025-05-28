import { NextRequest, NextResponse } from 'next/server'

import { getSession } from '@/actions/get-current-user'
import { ApiListingParams } from '@/features/host/types/api-listing-params'
import { prisma } from '@/lib/prisma/db'

export async function POST(request: NextRequest, { params }: ApiListingParams) {
  const session = await getSession()
  if (!session?.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const { listingId } = await params
  if (!listingId) {
    return NextResponse.json({ message: 'Listing ID is required' }, { status: 400 })
  }

  const { structure } = await request.json()
  if (!structure) {
    return NextResponse.json({ message: 'Structure is required' }, { status: 400 })
  }

  try {
    const listing = await prisma.listing.update({
      where: {
        userId: session.user.id,
        id: listingId,
      },
      data: {
        structure,
      },
    })

    return NextResponse.json(listing)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Failed to create structure' }, { status: 500 })
  }
}
