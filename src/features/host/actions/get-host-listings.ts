import { getSession } from '@/actions/get-current-user'
import { HostListing } from '@/features/host/types/host-listing'
import { prisma } from '@/lib/prisma/db'

export const hostFloorPlanSelect = {
  select: {
    id: true,
    roomCount: true,
    bathroomCount: true,
    bedroomCount: true,
    bedCount: true,
  },
}

export const hostGuestsAmountSelect = {
  select: {
    id: true,
    adultsCount: true,
    childrenCount: true,
    infantsCount: true,
    petsCount: true,
  },
}
export const hostImageSelect = {
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
    userId: true,
    roomType: true,
  },
}

export const hostLocationSelect = {
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
  },
}

export const hostPriceDetailSelect = {
  select: {
    id: true,
    type: true,
    amount: true,
  },
}

export const hostListingSelect = {
  amenities: true,
  createdAt: true,
  updatedAt: true,
  description: true,
  floorPlan: hostFloorPlanSelect,
  guestsAmount: hostGuestsAmountSelect,
  id: true,
  images: hostImageSelect,
  location: hostLocationSelect,
  priceDetails: hostPriceDetailSelect,
  privacyType: true,
  status: true,
  structure: true,
  title: true,
}

export async function getHostListing(listingId: string): Promise<HostListing | null> {
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
      select: hostListingSelect,
    })

    return listing
  } catch (error: any) {
    return null
  }
}

export async function getHostListings(): Promise<HostListing[] | null> {
  const session = await getSession()
  if (!session?.user?.id) {
    return null
  }

  try {
    const listings = await prisma.listing.findMany({
      where: {
        userId: session.user.id,
      },
      select: hostListingSelect,
    })

    return listings
  } catch (error: any) {
    return null
  }
}
