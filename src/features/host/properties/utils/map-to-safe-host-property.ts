import { HostProperty } from '@/features/host/properties/types/host-property'
import { SafeHostProperty } from '@/features/host/properties/types/safe-host-property'

export function mapToSafeHostProperty(
  property: HostProperty,
): SafeHostProperty {
  return {
    id: property.id,
    host: property.host
      ? {
          id: property.host.id,
          email: property.host.email ?? '',
          name: property.host.name
            ? {
                firstName: property.host.name.firstName,
                middleName: property.host.name.middleName || '',
                lastName: property.host.name.lastName,
              }
            : null,
          profileImage: property.host.profileImage
            ? {
                url: property.host.profileImage.url,
                fileName: property.host.profileImage.fileName,
              }
            : null,
        }
      : null,
    description: property.description,
    neighbourhoodDescription: property.neighbourhoodDescription,
    floorPlan: property.floorPlan,
    guestsAmount: property.guestsAmount,
    location: property.location,
    amenities: property.amenities,
    images: property.images,
    title: property.title,
    structure: property.structure,
    privacyType: property.privacyType,
    priceDetails: property.priceDetails,
    status: property.status,
    createdAt: property.createdAt.toISOString(),
    updatedAt: property.updatedAt.toISOString(),
  }
}
