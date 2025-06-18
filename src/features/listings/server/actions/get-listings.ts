import { ListingStatus } from '@prisma/client'

import { PublicListing } from '@/features/listings/types/public-listing'
import { prisma } from '@/lib/prisma/db'
import { ServerActionResponse } from '@/server/utils/error'
import { isMongoObjectId } from '@/utils/is-mongo-object-id'

export const publicListingAmenitySelect = {
  select: {
    type: true,
  },
}

export const publicListingFloorPlanSelect = {
  select: {
    bathrooms: true,
    bedrooms: true,
    beds: true,
    livingRooms: true,
    kitchens: true,
    rooms: true,
  },
}

export const publicListingGuestsAmountSelect = {
  select: {
    maxGuests: true,
    adults: true,
    children: true,
    infants: true,
    pets: true,
  },
}

export const publicListingImageSelect = {
  select: {
    url: true,
    isMain: true,
    roomType: true,
  },
}

export const publicListingLocationSelect = {
  select: {
    additionalInfo: true,
    aptInfo: true,
    city: true,
    country: true,
    houseNumber: true,
    postalCode: true,
    province: true,
    streetName: true,
    latitude: true,
    longitude: true,
  },
}

export const publicListingUserSelect = {
  select: {
    id: true,
    name: {
      select: {
        firstName: true,
      },
    },
    profileImage: true,
    createdAt: true,
  },
}

export const publicListingSelect = {
  amenities: publicListingAmenitySelect,
  createdAt: true,
  description: true,
  neighbourhoodDescription: true,
  floorPlan: publicListingFloorPlanSelect,
  guestsAmount: publicListingGuestsAmountSelect,
  id: true,
  images: publicListingImageSelect,
  location: publicListingLocationSelect,
  priceDetails: true,
  privacyType: true,
  status: true,
  structure: true,
  title: true,
  updatedAt: true,
  user: publicListingUserSelect,
}

export async function getPublishedListing(
  listingId: string,
): Promise<ServerActionResponse<PublicListing | null>> {
  if (!listingId || !isMongoObjectId(listingId)) {
    return { error: 'BAD_REQUEST' }
  }

  try {
    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
      select: publicListingSelect,
    })
    if (!listing) {
      return { error: 'NOT_FOUND' }
    }

    const { user, ...listingWithoutUser } = listing
    const listingWithHost: PublicListing = {
      ...listingWithoutUser,
      host: {
        id: user.id,
        name: user.name,
        profileImage: user.profileImage?.url ?? null,
        createdAt: user.createdAt,
      },
    }

    return { data: listingWithHost }
  } catch (error: unknown) {
    console.error(error)
    return { error: 'INTERNAL_SERVER_ERROR' }
  }
}

export async function getPublishedListings(): Promise<
  ServerActionResponse<PublicListing[] | null>
> {
  try {
    const listings = await prisma.listing.findMany({
      where: {
        status: ListingStatus.PUBLISHED,
        location: { isNot: null },
        floorPlan: { isNot: null },
      },
      select: publicListingSelect,
    })

    const listingsWithHost = listings.map((listing) => {
      const { user, ...listingWithoutUser } = listing
      return {
        ...listingWithoutUser,
        host: {
          id: user.id,
          name: user.name,
          profileImage: user.profileImage?.url ?? null,
          createdAt: user.createdAt,
        },
      }
    })

    return { data: listingsWithHost ?? null }
  } catch (error: unknown) {
    return { error: 'INTERNAL_SERVER_ERROR' }
  }
}
