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
  host: Pick<User, 'id' | 'createdAt'> & {
    name: Pick<Name, 'firstName'> | null
    profileImage: string | null
  }
  priceDetails: Pick<ListingPriceDetail, 'id' | 'type' | 'amount'>[]
}
