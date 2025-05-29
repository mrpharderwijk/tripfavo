import {
  Listing,
  ListingAmenity,
  ListingFloorPlan,
  ListingImage,
  ListingLocation,
  ListingPriceDetail,
  Name,
  User,
} from '@prisma/client'

export type PublicListing = Omit<Listing, 'userId'> & {
  amenities: Pick<ListingAmenity, 'type'>[]
  location: Omit<ListingLocation, 'id' | 'listingId' | 'createdAt' | 'updatedAt'> | null
  floorPlan: Omit<ListingFloorPlan, 'id' | 'listingId' | 'createdAt' | 'updatedAt'> | null
  images: Pick<ListingImage, 'url' | 'isMain' | 'roomType'>[]
  user: Pick<User, 'id' | 'image' | 'createdAt'> & {
    name: Pick<Name, 'firstName'> | null
  }
  priceDetails: Pick<ListingPriceDetail, 'id' | 'type' | 'amount'>[]
}
