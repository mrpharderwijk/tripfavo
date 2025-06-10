import { NextResponse } from 'next/server'

import { getSession } from '@/actions/get-current-user'
import { hostListingSelect } from '@/features/host/actions/get-host-listings'
import { HostListingParams } from '@/features/host/types/host-listing-params'
import { prisma } from '@/lib/prisma/db'

export async function GET(request: Request, { params }: HostListingParams) {
  const session = await getSession()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { listingId } = await params
  if (!listingId) {
    return NextResponse.json({ error: 'Listing ID is required' }, { status: 400 })
  }

  try {
    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
      select: hostListingSelect,
    })

    return NextResponse.json(listing, { status: 200 })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: HostListingParams) {
  const session = await getSession()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { listingId } = await params
  if (!listingId) {
    return NextResponse.json({ error: 'Listing ID is required' }, { status: 400 })
  }

  try {
    await prisma.listing.delete({
      where: { userId: session.user.id, id: listingId },
    })

    return NextResponse.json({ message: 'Listing deleted successfully' }, { status: 200 })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
