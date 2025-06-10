import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { getGuestReservations } from '@/features/guest/actions/get-guest-reservations'
import { ReservationItem } from '@/features/guest/trips/components/reservation-item/reservation-item'

export default async function TripsPage() {
  const reservations = await getGuestReservations()

  return (
    <FlexBox flex-direction="col" gap={3}>
      {!!reservations?.length &&
        reservations.map((reservation) => (
          <ReservationItem
            key={reservation.id}
            id={reservation.id}
            image={
              reservation.listing.images.find((image) => !!image.isMain)
                ? {
                    url: reservation.listing.images.find((image) => !!image.isMain)!.url,
                    fileName: reservation.listing.title,
                  }
                : null
            }
            title={`${reservation.listing.location?.city}, ${reservation.listing.location?.country}`}
            status={reservation.status}
            startDate={reservation.startDate}
            endDate={reservation.endDate}
          />
        ))}
    </FlexBox>
  )
}
