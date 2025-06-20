import { getTranslations } from 'next-intl/server'
import { ReactElement } from 'react'
import { ReservationStatus } from '@prisma/client'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { GuestReservationsNoResults } from '@/features/guest/reservations/guest-reservations/components/guest-reservations-no-results/guest-reservations-no-results'
import { GuestReservation } from '@/features/guest/types/guest-reservation'
import { ReservationsList } from '@/features/reservations/reservations-list/reservations-list'

type GuestReservationsProps = {
  reservations: GuestReservation[]
}

export async function GuestReservationsOverview({
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
      {!reservations?.length && <GuestReservationsNoResults />}

      <ReservationsList
        heading={tGuestReservations('confirmedHeading')}
        items={confirmedReservations}
        urlBasePath="/guest/reservations"
      />

      <ReservationsList
        heading={tGuestReservations('pendingHeading')}
        items={pendingReservations}
        urlBasePath="/guest/reservations"
      />

      <ReservationsList
        heading={tGuestReservations('cancelledHeading')}
        items={cancelledReservations}
        urlBasePath="/guest/reservations"
      />
    </FlexBox>
  )
}
