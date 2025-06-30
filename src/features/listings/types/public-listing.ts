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

export type PublicListingAmenity = Pick<ListingAmenity, 'type'>
export type PublicListingFloorPlan = Omit<
  ListingFloorPlan,
  'id' | 'listingId' | 'createdAt' | 'updatedAt'
>
export type PublicListingGuestsAmount = Omit<
  ListingGuestsAmount,
  'id' | 'listingId' | 'createdAt' | 'updatedAt'
>
export type PublicListingHost = Pick<User, 'id'> & {
  name: Pick<Name, 'firstName'> | null
  profileImage: string | null
  createdAt: string
  updatedAt: string
}
export type PublicListingImage = Pick<
  ListingImage,
  'url' | 'isMain' | 'roomType'
>
export type PublicListingLocation = Omit<
  ListingLocation,
  'id' | 'listingId' | 'createdAt' | 'updatedAt'
>
export type PublicListingPriceDetail = Pick<
  ListingPriceDetail,
  'id' | 'type' | 'price'
>

export type PublicListing = Omit<Listing, 'hostId'> & {
  amenities: PublicListingAmenity[]
  floorPlan: PublicListingFloorPlan | null
  guestsAmount: PublicListingGuestsAmount | null
  host: PublicListingHost
  images: PublicListingImage[]
  location: PublicListingLocation | null
  priceDetails: PublicListingPriceDetail[]
}
