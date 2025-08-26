import { PropertyStatus } from '@prisma/client'

import { PublicProperty } from '@/features/properties/types/public-property'
import { prisma } from '@/lib/prisma/db'
import { ServerActionResponse } from '@/server/utils/error'

export const publicPropertyAmenitySelect = {
  select: {
    type: true,
  },
}

export const publicPropertyFloorPlanSelect = {
  select: {
    bathrooms: true,
    bedrooms: true,
    beds: true,
    livingRooms: true,
    kitchens: true,
    rooms: true,
  },
}

export const publicPropertyGuestsAmountSelect = {
  select: {
    maxGuests: true,
    adults: true,
    children: true,
    infants: true,
    pets: true,
  },
}

export const publicPropertyImageSelect = {
  select: {
    url: true,
    isMain: true,
    roomType: true,
  },
}

export const publicPropertyLocationSelect = {
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

export const publicPropertyUserSelect = {
  select: {
    id: true,
    name: {
      select: {
        firstName: true,
      },
    },
    profileImage: true,
    createdAt: true,
    updatedAt: true,
  },
}

export const publicPropertySelect = {
  amenities: publicPropertyAmenitySelect,
  createdAt: true,
  description: true,
  neighbourhoodDescription: true,
  floorPlan: publicPropertyFloorPlanSelect,
  guestsAmount: publicPropertyGuestsAmountSelect,
  id: true,
  host: publicPropertyUserSelect,
  images: publicPropertyImageSelect,
  location: publicPropertyLocationSelect,
  priceDetails: true,
  privacyType: true,
  status: true,
  structure: true,
  title: true,
  updatedAt: true,
}

export async function getPublishedProperty(
  propertyId: string,
): Promise<ServerActionResponse<PublicProperty | null>> {
  if (!propertyId) {
    return { error: 'BAD_REQUEST' }
  }

  try {
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      select: publicPropertySelect,
    })
    if (!property) {
      return { error: 'NOT_FOUND' }
    }
    const { host, ...propertyWithoutUser } = property
    const propertyWithHost: PublicProperty = {
      ...propertyWithoutUser,
      host: {
        id: host.id,
        name: host.name,
        profileImage: host.profileImage?.url ?? null,
        createdAt: host.createdAt.toISOString(),
        updatedAt: host.updatedAt.toISOString(),
      },
    }

    return { data: propertyWithHost }
  } catch (error: unknown) {
    console.error(error)
    return { error: 'INTERNAL_SERVER_ERROR' }
  }
}

export async function getPublishedProperties(): Promise<
  ServerActionResponse<PublicProperty[] | null>
> {
  try {
    const properties = await prisma.property.findMany({
      where: {
        status: PropertyStatus.PUBLISHED,
        location: { isNot: null },
        floorPlan: { isNot: null },
      },
      select: publicPropertySelect,
    })

    const propertiesWithHost = properties.map((property) => {
      const { host, ...propertyWithoutUser } = property
      return {
        ...propertyWithoutUser,
        host: {
          id: host.id,
          name: host.name,
          profileImage: host.profileImage?.url ?? null,
          createdAt: host.createdAt.toISOString(),
          updatedAt: host.updatedAt.toISOString(),
        },
      }
    })

    return { data: propertiesWithHost ?? null }
  } catch (error: unknown) {
    console.error('Error in getPublishedProperties:', error)
    return { error: 'INTERNAL_SERVER_ERROR' }
  }
}
