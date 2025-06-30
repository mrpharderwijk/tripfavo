import { getSession } from '@/features/auth/server/actions/get-current-user'
import { SafeHostListing } from '@/features/host/listings/types/safe-host-listing'
import { mapToSafeHostListing } from '@/features/host/listings/utils/map-to-safe-host-listing'
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
    hostId: true,
    isMain: true,
    size: true,
    url: true,
    createdAt: true,
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

export const hostUserSelect = {
  select: {
    id: true,
    email: true,
    role: true,
    createdAt: true,
    updatedAt: true,
    name: {
      select: {
        firstName: true,
        middleName: true,
        lastName: true,
      },
    },
    profileImage: {
      select: {
        url: true,
        fileName: true,
      },
    },
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
  host: hostUserSelect,
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
): Promise<ServerActionResponse<SafeHostListing | null>> {
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
        hostId: session.user.id,
        id: listingId,
      },
      select: hostListingSelect,
    })

    const safeListing = listing ? mapToSafeHostListing(listing) : null

    return { data: safeListing }
  } catch (error: any) {
    return { error: 'INTERNAL_SERVER_ERROR' }
  }
}

export async function getHostListings(): Promise<
  ServerActionResponse<SafeHostListing[] | null>
> {
  const session = await getSession()
  if (!session?.user?.id) {
    return { error: 'UNAUTHORIZED' }
  }

  try {
    const listings = await prisma.listing.findMany({
      where: {
        hostId: session.user.id,
      },
      select: hostListingSelect,
    })

    const safeListings = listings.map((listing) =>
      mapToSafeHostListing(listing),
    )

    return { data: safeListings ?? null }
  } catch (error: any) {
    return { error: 'INTERNAL_SERVER_ERROR' }
  }
}
