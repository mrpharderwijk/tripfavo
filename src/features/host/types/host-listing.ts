import {
  ListingAmenity,
  ListingGuestsAmount,
  ListingPriceDetail,
} from '@prisma/client'
import {
  Listing,
  ListingFloorPlan,
  ListingImage,
  ListingLocation,
} from '@prisma/client'

export type HostListing = Omit<
  Listing,
  'userId' | 'createdAt' | 'updatedAt'
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
  createdAt: string
  updatedAt: string
}
