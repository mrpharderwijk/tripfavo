import { ListingStatus } from '@prisma/client'

import { PublicListing } from '@/features/listings/types/public-listing'
import { prisma } from '@/lib/prisma/db'

export const publicListingAmenitySelect = {
  select: {
    type: true,
  },
}

export const publicListingFloorPlanSelect = {
  select: {
    bathroomCount: true,
    bedCount: true,
    bedroomCount: true,
    roomCount: true,
    guestCount: true,
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
    image: true,
    createdAt: true,
  },
}

export const publicListingSelect = {
  amenities: publicListingAmenitySelect,
  createdAt: true,
  description: true,
  floorPlan: publicListingFloorPlanSelect,
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

export async function getPublishedListings(): Promise<PublicListing[]> {
  try {
    const listings = await prisma.listing.findMany({
      where: {
        status: ListingStatus.PUBLISHED,
        location: { isNot: null },
        floorPlan: { isNot: null },
      },
      select: publicListingSelect,
    })

    return listings ?? []
  } catch (error: unknown) {
    console.error(error)
    return []
  }
}
