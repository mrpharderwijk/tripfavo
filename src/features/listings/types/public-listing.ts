import {
  Listing,
  ListingAmenity,
  ListingFloorPlan,
  ListingGuestsAmount,
  ListingImage,
  ListingLocation,
  ListingPriceDetail,
  Name,
  User,
} from '@prisma/client'

export type PublicListing = Omit<Listing, 'userId'> & {
  amenities: Pick<ListingAmenity, 'type'>[]
  floorPlan: Omit<ListingFloorPlan, 'id' | 'listingId' | 'createdAt' | 'updatedAt'> | null
  guestsAmount: Omit<ListingGuestsAmount, 'id' | 'listingId' | 'createdAt' | 'updatedAt'> | null
  host: Pick<User, 'id' | 'createdAt'> & {
    name: Pick<Name, 'firstName'> | null
    profileImage: string | null
  }
  images: Pick<ListingImage, 'url' | 'isMain' | 'roomType'>[]
  location: Omit<ListingLocation, 'id' | 'listingId' | 'createdAt' | 'updatedAt'> | null
  priceDetails: Pick<ListingPriceDetail, 'id' | 'type' | 'amount'>[]
}
