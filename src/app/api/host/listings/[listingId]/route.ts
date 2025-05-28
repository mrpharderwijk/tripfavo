import { NextResponse } from 'next/server'

import { getSession } from '@/actions/get-current-user'
import { ApiListingParams } from '@/features/host/types/api-listing-params'
import { prisma } from '@/lib/prisma/db'

export async function GET(request: Request, { params }: ApiListingParams) {
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
      select: {
        id: true,
        title: true,
        description: true,
        location: {
          where: {
            listingId,
          },
          select: {
            id: true,
            country: true,
            city: true,
            streetName: true,
            houseNumber: true,
            postalCode: true,
            latitude: true,
            longitude: true,
            aptInfo: true,
            additionalInfo: true,
            province: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        price: true,
        structure: true,
        privacyType: true,
        floorPlan: {
          where: {
            listingId,
          },
          select: {
            id: true,
            guestCount: true,
            roomCount: true,
            bathroomCount: true,
            bedroomCount: true,
            bedCount: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        images: {
          where: {
            listingId,
          },
          select: {
            id: true,
            fileKey: true,
            fileName: true,
            fileHash: true,
            fileType: true,
            isMain: true,
            size: true,
            url: true,
            createdAt: true,
            updatedAt: true,
            userId: true,
            listingRoomId: true,
            listingRoom: {
              select: {
                room: true,
              },
            },
          },
        },
        createdAt: true,
      },
    })

    return NextResponse.json(listing, { status: 200 })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: ApiListingParams) {
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
