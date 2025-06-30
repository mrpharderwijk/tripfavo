import { NextResponse } from 'next/server'

import { getSession } from '@/features/auth/server/actions/get-current-user'
import { hostListingSelect } from '@/features/host/listings/server/actions/get-host-listings'
import { HostListingParams } from '@/features/host/listings/types/host-listing-params'
import { prisma } from '@/lib/prisma/db'

export async function GET(
  request: Request,
  { params }: HostListingParams,
): Promise<NextResponse> {
  const session = await getSession()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { listingId } = await params
  if (!listingId) {
    return NextResponse.json(
      { error: 'Listing ID is required' },
      { status: 400 },
    )
  }

  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
        hostId: session.user.id,
      },
      select: hostListingSelect,
    })

    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
    }

    return NextResponse.json(listing, { status: 200 })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: HostListingParams,
): Promise<NextResponse> {
  const session = await getSession()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { listingId } = await params
  if (!listingId) {
    return NextResponse.json(
      { error: 'Listing ID is required' },
      { status: 400 },
    )
  }

  try {
    await prisma.listing.delete({
      where: { hostId: session.user.id, id: listingId },
    })

    return NextResponse.json(
      { message: 'Listing deleted successfully' },
      { status: 200 },
    )
  } catch (error: any) {
    console.error(error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
