import { DbBooking, SafeBooking } from '@/features/bookings/types/booking'

export function mapToSafeBooking(booking: DbBooking): SafeBooking | null {
  if (!booking) {
    return null
  }

  return {
    id: booking.id,
    startDate: booking.startDate.toISOString(),
    endDate: booking.endDate.toISOString(),
    status: booking.status,
    guestsAmount: {
      adults: booking.guestsAmount!.adults ?? 0,
      children: booking.guestsAmount!.children ?? 0,
      infants: booking.guestsAmount!.infants ?? 0,
      pets: booking.guestsAmount!.pets ?? 0,
    },
    guest: booking.guest
      ? {
          id: booking.guest.id,
          name: booking.guest.name
            ? {
                firstName: booking.guest.name.firstName ?? '',
                middleName: booking.guest.name.middleName ?? '',
                lastName: booking.guest.name.lastName ?? '',
              }
            : null,
          profileImage: booking.guest.profileImage
            ? {
                url: booking.guest.profileImage.url ?? '',
                fileName: booking.guest.profileImage.fileName ?? '',
              }
            : null,
          createdAt: booking.guest.createdAt.toISOString(),
        }
      : null,
    property: {
      id: booking.property.id,
      title: booking.property.title ?? '',
      images: booking.property.images.map((img) => ({
        fileName: img.fileName ?? '',
        url: img.url ?? '',
        isMain: img.isMain ?? false,
      })),
      location: {
        city: booking.property.location?.city ?? '',
        country: booking.property.location?.country ?? '',
      },
      host: {
        id: booking.property.host.id,
        name: booking.property.host.name
          ? {
              firstName: booking.property.host.name.firstName ?? '',
              middleName: booking.property.host.name.middleName ?? '',
              lastName: booking.property.host.name.lastName ?? '',
            }
          : null,
        profileImage: {
          url: booking.property.host.profileImage?.url ?? '',
          fileName: booking.property.host.profileImage?.fileName ?? '',
        },
      },
    },
    priceDetails: booking.priceDetails
      .filter((pd) => pd.type !== null)
      .map((pd) => ({
        id: pd.id,
        createdAt: pd.createdAt.toISOString(),
        updatedAt: pd.updatedAt.toISOString(),
        price: pd.price,
        type: pd.type!,
      })),
    createdAt: booking.createdAt.toISOString(),
    updatedAt: booking.updatedAt.toISOString(),
  }
}
