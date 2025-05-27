import { Listing, ListingFloorPlan, ListingImage, ListingLocation } from '@prisma/client'

import { getSession } from '@/actions/get-current-user'
import { prisma } from '@/lib/prisma/db'

export type ListingFull = Omit<Listing, 'userId' | 'status'> & {
  location: Omit<ListingLocation, 'listingId'>
  floorPlan: Omit<ListingFloorPlan, 'listingId'>
  images: (Omit<ListingImage, 'listingId'> & {
    listingRoom?: {
      room: {
        value: string
      } | null
    } | null
  })[]
}

export async function getListingByLoggedInUser(listingId: string): Promise<ListingFull | null> {
  const session = await getSession()
  if (!session?.user?.id) {
    return null
  }

  if (!listingId) {
    return null
  }

  try {
    const listing = await prisma.listing.findUnique({
      where: {
        userId: session.user.id,
        id: listingId,
      },
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

    return listing as ListingFull
  } catch (error: any) {
    return null
  }
}
