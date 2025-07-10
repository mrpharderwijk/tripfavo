import {
  Name,
  PropertyAmenity,
  PropertyGuestsAmount,
  PropertyPriceDetail,
  User,
} from '@prisma/client'
import {
  Property,
  PropertyFloorPlan,
  PropertyImage,
  PropertyLocation,
} from '@prisma/client'

export type HostProperty = Omit<
  Property,
  'hostId' | 'createdAt' | 'updatedAt' | 'name'
> & {
  id?: string
  location: Omit<
    PropertyLocation,
    'propertyId' | 'createdAt' | 'updatedAt'
  > | null
  floorPlan: Omit<
    PropertyFloorPlan,
    'propertyId' | 'createdAt' | 'updatedAt'
  > | null
  guestsAmount: Omit<
    PropertyGuestsAmount,
    'propertyId' | 'createdAt' | 'updatedAt'
  > | null
  images:
    | Omit<PropertyImage, 'propertyId' | 'userId' | 'roomId' | 'updatedAt'>[]
    | null
  amenities:
    | Omit<
        PropertyAmenity,
        'propertyId' | 'userId' | 'createdAt' | 'updatedAt'
      >[]
    | null
  priceDetails:
    | Omit<
        PropertyPriceDetail,
        'propertyId' | 'userId' | 'createdAt' | 'updatedAt'
      >[]
    | null
  host:
    | (Omit<
        User,
        'createdAt' | 'updatedAt' | 'emailVerified' | 'hashedPassword'
      > & {
        name: Pick<Name, 'firstName' | 'middleName' | 'lastName'> | null
        profileImage: {
          url: string
          fileName: string
        } | null
      })
    | null
  createdAt: Date
  updatedAt: Date
}
