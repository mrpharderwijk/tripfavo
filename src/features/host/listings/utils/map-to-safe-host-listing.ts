import { HostListing } from '@/features/host/listings/types/host-listing'
import { SafeHostListing } from '@/features/host/listings/types/safe-host-listing'

export function mapToSafeHostListing(listing: HostListing): SafeHostListing {
  return {
    id: listing.id,
    host: listing.host
      ? {
          id: listing.host.id,
          email: listing.host.email ?? '',
          name: listing.host.name
            ? {
                firstName: listing.host.name.firstName,
                middleName: listing.host.name.middleName || '',
                lastName: listing.host.name.lastName,
              }
            : null,
          profileImage: listing.host.profileImage
            ? {
                url: listing.host.profileImage.url,
                fileName: listing.host.profileImage.fileName,
              }
            : null,
        }
      : null,
    description: listing.description,
    neighbourhoodDescription: listing.neighbourhoodDescription,
    floorPlan: listing.floorPlan,
    guestsAmount: listing.guestsAmount,
    location: listing.location,
    amenities: listing.amenities,
    images: listing.images,
    title: listing.title,
    structure: listing.structure,
    privacyType: listing.privacyType,
    priceDetails: listing.priceDetails,
    status: listing.status,
    createdAt: listing.createdAt.toISOString(),
    updatedAt: listing.updatedAt.toISOString(),
  }
}
