import { DbBooking, SafeBooking } from '@/features/bookings/types/booking'

export function mapToSafeBooking(bookings: DbBooking[]): SafeBooking[] {
  if (!bookings) {
    return []
  }

  return bookings
    .filter((booking) => booking.guestsAmount !== null)
    .map((booking) => ({
      id: booking.id,
      startDate: booking.startDate,
      endDate: booking.endDate,
      status: booking.status,
      guestsAmount: {
        adults: booking.guestsAmount!.adults ?? 0,
        children: booking.guestsAmount!.children ?? 0,
        infants: booking.guestsAmount!.infants ?? 0,
        pets: booking.guestsAmount!.pets ?? 0,
      },
      listing: {
        id: booking.listing.id,
        title: booking.listing.title ?? '',
        images: booking.listing.images.map((img) => ({
          fileName: img.fileName ?? '',
          url: img.url ?? '',
          isMain: img.isMain ?? false,
        })),
        location: {
          city: booking.listing.location?.city ?? '',
          country: booking.listing.location?.country ?? '',
        },
      },
      priceDetails: booking.priceDetails
        .filter((pd) => pd.type !== null)
        .map((pd) => ({
          id: pd.id,
          createdAt: pd.createdAt,
          updatedAt: pd.updatedAt,
          price: pd.price,
          type: pd.type!,
        })),
      createdAt: booking.createdAt.toISOString(),
      updatedAt: booking.updatedAt.toISOString(),
    }))
}
