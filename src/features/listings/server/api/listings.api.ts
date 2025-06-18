import { NextResponse } from 'next/server'
import { ListingStatus } from '@prisma/client'

import { prisma } from '@/lib/prisma/db'

export async function GET(): Promise<NextResponse> {
  try {
    const listings = await prisma.listing.findMany({
      where: {
        status: ListingStatus.PUBLISHED,
      },
    })

    return NextResponse.json(listings)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
