import {
  ListingAmenity,
  ListingGuestsAmount,
  ListingPriceDetail,
  Name,
  User,
} from '@prisma/client'
import {
  Listing,
  ListingFloorPlan,
  ListingImage,
  ListingLocation,
} from '@prisma/client'

export type HostListing = Omit<
  Listing,
  'hostId' | 'createdAt' | 'updatedAt' | 'name'
> & {
  id?: string
  location: Omit<
    ListingLocation,
    'listingId' | 'createdAt' | 'updatedAt'
  > | null
  floorPlan: Omit<
    ListingFloorPlan,
    'listingId' | 'createdAt' | 'updatedAt'
  > | null
  guestsAmount: Omit<
    ListingGuestsAmount,
    'listingId' | 'createdAt' | 'updatedAt'
  > | null
  images:
    | Omit<ListingImage, 'listingId' | 'userId' | 'roomId' | 'updatedAt'>[]
    | null
  amenities:
    | Omit<ListingAmenity, 'listingId' | 'userId' | 'createdAt' | 'updatedAt'>[]
    | null
  priceDetails:
    | Omit<
        ListingPriceDetail,
        'listingId' | 'userId' | 'createdAt' | 'updatedAt'
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
