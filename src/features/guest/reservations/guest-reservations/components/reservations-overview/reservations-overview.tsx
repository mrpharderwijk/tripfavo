import { getTranslations } from 'next-intl/server'
import { ReactElement } from 'react'
import { ReservationStatus } from '@prisma/client'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { ReservationsList } from '@/features/guest/reservations/guest-reservations/components/reservations-list/reservations-list'
import { ReservationNoResults } from '@/features/guest/reservations/guest-reservations/components/reservations-no-results/reservation-no-results'
import { GuestReservation } from '@/features/guest/types/guest-reservation'

type GuestReservationsProps = {
  reservations: GuestReservation[]
}

export async function GuestReservations({
  reservations,
}: GuestReservationsProps): Promise<ReactElement> {
  const tGuestReservations = await getTranslations('guest.reservations')
  const pendingReservations = reservations.filter(
    (reservation) => reservation.status === ReservationStatus.PENDING,
  )
  const confirmedReservations = reservations.filter(
    (reservation) => reservation.status === ReservationStatus.CONFIRMED,
  )
  const cancelledReservations = reservations.filter(
    (reservation) => reservation.status === ReservationStatus.CANCELLED,
  )

  return (
    <FlexBox flex-direction="col" gap={6}>
      {!reservations?.length && <ReservationNoResults />}

      <ReservationsList
        heading={tGuestReservations('confirmedHeading')}
        items={confirmedReservations}
      />

      <ReservationsList
        heading={tGuestReservations('pendingHeading')}
        items={pendingReservations}
      />

      <ReservationsList
        heading={tGuestReservations('cancelledHeading')}
        items={cancelledReservations}
      />
    </FlexBox>
  )
}
