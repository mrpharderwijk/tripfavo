import { Listing, ListingFloorPlan, ListingImage, ListingLocation } from '@prisma/client'

import { getSession } from '@/actions/get-current-user'
import { prisma } from '@/lib/prisma/db'

export type ListingFull = Omit<Listing, 'userId'> & {
  location: Omit<ListingLocation, 'listingId'>
  floorPlan: Omit<ListingFloorPlan, 'listingId'>
  images: Omit<ListingImage, 'listingId'>[]
}

export async function getListingByLoggedInUser(listingId: string): Promise<ListingFull | null> {
  const session = await getSession()
  if (!session?.user?.id) {
    return null
  }
  console.log('server ------> ', listingId)
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
          where: {
            listingId,
          },
          select: {
            guestCount: true,
            roomCount: true,
            bathroomCount: true,
            bedCount: true,
          },
        },
        images: {
          where: {
            listingId,
          },
          select: {
            fileName: true,
            url: true,
            fileHash: true,
            fileType: true,
            size: true,
            key: true,
            isMain: true,
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
