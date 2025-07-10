import {
  Name,
  Property,
  PropertyAmenity,
  PropertyFloorPlan,
  PropertyGuestsAmount,
  PropertyImage,
  PropertyLocation,
  PropertyPriceDetail,
  User,
} from '@prisma/client'

export type PublicPropertyAmenity = Pick<PropertyAmenity, 'type'>
export type PublicPropertyFloorPlan = Omit<
  PropertyFloorPlan,
  'id' | 'propertyId' | 'createdAt' | 'updatedAt'
>
export type PublicPropertyGuestsAmount = Omit<
  PropertyGuestsAmount,
  'id' | 'propertyId' | 'createdAt' | 'updatedAt'
>
export type PublicPropertyHost = Pick<User, 'id'> & {
  name: Pick<Name, 'firstName'> | null
  profileImage: string | null
  createdAt: string
  updatedAt: string
}
export type PublicPropertyImage = Pick<
  PropertyImage,
  'url' | 'isMain' | 'roomType'
>
export type PublicPropertyLocation = Omit<
  PropertyLocation,
  'id' | 'propertyId' | 'createdAt' | 'updatedAt'
>
export type PublicPropertyPriceDetail = Pick<
  PropertyPriceDetail,
  'id' | 'type' | 'price'
>

export type PublicProperty = Omit<Property, 'hostId'> & {
  amenities: PublicPropertyAmenity[]
  floorPlan: PublicPropertyFloorPlan | null
  guestsAmount: PublicPropertyGuestsAmount | null
  host: PublicPropertyHost
  images: PublicPropertyImage[]
  location: PublicPropertyLocation | null
  priceDetails: PublicPropertyPriceDetail[]
}
