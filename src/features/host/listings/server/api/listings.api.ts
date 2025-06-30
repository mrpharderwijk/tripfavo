import { NextResponse } from 'next/server'
import { Listing, ListingStatus } from '@prisma/client'

import { getSession } from '@/features/auth/server/actions/get-current-user'
import { prisma } from '@/lib/prisma/db'

export async function POST(): Promise<
  NextResponse<Listing | { error: string }>
> {
  const session = await getSession()

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 })
  }

  try {
    const listing = await prisma.listing.create({
      data: {
        hostId: session.user.id,
        title: '',
        description: '',
        neighbourhoodDescription: '',
        status: ListingStatus.DRAFT,
      },
    })

    return NextResponse.json(listing)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'INTERNAL_SERVER_ERROR' },
      { status: 500 },
    )
  }
}

export async function GET(): Promise<
  NextResponse<Listing[] | { error: string }>
> {
  const session = await getSession()

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const listings = await prisma.listing.findMany({
      where: {
        hostId: session.user.id,
      },
    })

    return NextResponse.json(listings)
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
