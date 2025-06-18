import { getSession } from '@/features/auth/server/actions/get-current-user'
import { HostListing } from '@/features/host/types/host-listing'
import { prisma } from '@/lib/prisma/db'
import { ServerActionResponse } from '@/server/utils/error'

export const hostFloorPlanSelect = {
  select: {
    id: true,
    rooms: true,
    bathrooms: true,
    bedrooms: true,
    beds: true,
    livingRooms: true,
    kitchens: true,
  },
}

export const hostGuestsAmountSelect = {
  select: {
    id: true,
    maxGuests: true,
    adults: true,
    children: true,
    infants: true,
    pets: true,
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
    price: true,
  },
}

export const hostListingSelect = {
  amenities: true,
  createdAt: true,
  updatedAt: true,
  description: true,
  neighbourhoodDescription: true,
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

export async function getHostListing(
  listingId: string,
): Promise<ServerActionResponse<HostListing | null>> {
  const session = await getSession()
  if (!session?.user?.id) {
    return { error: 'UNAUTHORIZED' }
  }

  if (!listingId) {
    return { error: 'BAD_REQUEST' }
  }

  try {
    const listing = await prisma.listing.findUnique({
      where: {
        userId: session.user.id,
        id: listingId,
      },
      select: hostListingSelect,
    })

    return { data: listing ?? null }
  } catch (error: any) {
    return { error: 'INTERNAL_SERVER_ERROR' }
  }
}

export async function getHostListings(): Promise<
  ServerActionResponse<HostListing[] | null>
> {
  const session = await getSession()
  if (!session?.user?.id) {
    return { error: 'UNAUTHORIZED' }
  }

  try {
    const listings = await prisma.listing.findMany({
      where: {
        userId: session.user.id,
      },
      select: hostListingSelect,
    })

    return { data: listings ?? null }
  } catch (error: any) {
    return { error: 'INTERNAL_SERVER_ERROR' }
  }
}
