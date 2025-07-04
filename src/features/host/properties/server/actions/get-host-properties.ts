import { SafeHostProperty } from '@/features/host/properties/types/safe-host-property'
import { mapToSafeHostProperty } from '@/features/host/properties/utils/map-to-safe-host-property'
import { prisma } from '@/lib/prisma/db'
import { ServerActionResponse } from '@/server/utils/error'
import { isUserValid } from '@/server/utils/is-valid-user'

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

export const hostPropertySelect = {
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

export async function getHostProperty({
  userId,
  propertyId,
}: {
  userId?: string
  propertyId?: string
}): Promise<ServerActionResponse<SafeHostProperty | null>> {
  if (!userId) {
    return { error: 'UNAUTHORIZED' }
  }

  if (!propertyId) {
    return { error: 'BAD_REQUEST' }
  }

  try {
    const property = await prisma.property.findUnique({
      where: {
        hostId: userId,
        id: propertyId,
      },
      select: hostPropertySelect,
    })

    const safeProperty = property ? mapToSafeHostProperty(property) : null

    return { data: safeProperty }
  } catch (error: any) {
    return { error: 'INTERNAL_SERVER_ERROR' }
  }
}

export async function getHostProperties({
  userId,
}: {
  userId?: string
}): Promise<ServerActionResponse<SafeHostProperty[] | null>> {
  if (!userId) {
    return { error: 'BAD_REQUEST' }
  }

  const isValidUser = await isUserValid(userId)
  if (!isValidUser) {
    return { error: 'UNAUTHORIZED' }
  }

  try {
    const properties = await prisma.property.findMany({
      where: {
        hostId: userId,
      },
      select: hostPropertySelect,
    })

    const safeProperties = properties.map((property) =>
      mapToSafeHostProperty(property),
    )

    return { data: safeProperties ?? null }
  } catch (error: any) {
    return { error: 'INTERNAL_SERVER_ERROR' }
  }
}
