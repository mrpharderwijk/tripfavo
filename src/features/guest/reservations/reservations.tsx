import { FlexBox } from "@/components/atoms/layout/flex-box/flex-box";
import { ReservationItem } from "@/features/guest/reservations/components/reservations-item/reservation-item";
import { ReservationNoResults } from "@/features/guest/reservations/components/reservations-no-results/reservation-no-results";
import { GuestReservation } from "@/features/guest/types/guest-reservation";

type ReservationsProps = {
  reservations: GuestReservation[]
}

export function Reservations({ reservations }: ReservationsProps) {
  return (
    <FlexBox flex-direction="col" gap={3}>
      {!reservations?.length && <ReservationNoResults />}
      {!!reservations?.length &&
        reservations.map((reservation) => (
          <ReservationItem
            key={reservation.id}
            id={reservation.id}
            image={
              reservation.listing?.images.find((image) => !!image.isMain)
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