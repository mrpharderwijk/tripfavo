import { getSession } from '@/actions/get-current-user'
import { ListingView } from '@/features/host/types/listing-view'
import { prisma } from '@/lib/prisma/db'

export async function getListingByLoggedInUser(listingId: string): Promise<ListingView | null> {
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
        amenities: {
          where: {
            listingId,
          },
          select: {
            id: true,
            amenityValue: true,
          },
        },
        status: true,
        createdAt: true,
      },
    })

    // TODO: casting type needs to be fixed
    return listing as ListingView
  } catch (error: any) {
    return null
  }
}
