import { ListingAmenity } from '@prisma/client'
import { Listing, ListingFloorPlan, ListingImage, ListingLocation } from '@prisma/client'

export type ListingView = Omit<Listing, 'userId'> & {
  location: Omit<ListingLocation, 'listingId'>
  floorPlan: Omit<ListingFloorPlan, 'listingId'>
  images: (Omit<ListingImage, 'listingId' | 'userId'> & {
    listingRoom?: {
      room: {
        value: string
      } | null
    } | null
  })[]
  amenities: Omit<ListingAmenity, 'listingId' | 'userId'>[]
}
