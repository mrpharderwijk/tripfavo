import { Listing, ListingFloorPlan, ListingImage, ListingLocation } from '@prisma/client'

import { getSession } from '@/actions/get-current-user'
import { prisma } from '@/lib/prisma/db'

export type ListingFull = Omit<Listing, 'userId'> & {
  location: Omit<ListingLocation, 'listingId'>
  floorPlan: Omit<ListingFloorPlan, 'listingId'>
  images: Omit<ListingImage, 'listingId' | 'userId'>[]
}

export async function getListingsByLoggedInUser(): Promise<ListingFull[] | null> {
  const session = await getSession()

  if (!session?.user?.id) {
    return null
  }

  try {
    const listings = await prisma.listing.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        location: {
          select: {
            id: true,
            createdAt: true,
            updatedAt: true,
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
          },
        },
        price: true,
        structure: true,
        privacyType: true,
        floorPlan: {
          select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            guestCount: true,
            roomCount: true,
            bathroomCount: true,
            bedroomCount: true,
            bedCount: true,
          },
        },
        images: {
          select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            fileHash: true,
            fileKey: true,
            fileName: true,
            fileType: true,
            size: true,
            url: true,
            isMain: true,
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

    if (!listings) {
      return null
    }

    return listings as ListingFull[]
  } catch (error: any) {
    return null
  }
}
