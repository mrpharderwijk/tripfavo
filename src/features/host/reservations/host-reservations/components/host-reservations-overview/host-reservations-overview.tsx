import { getTranslations } from 'next-intl/server'
import { ReactElement } from 'react'
import { ReservationStatus } from '@prisma/client'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { HostReservationsNoResults } from '@/features/host/reservations/host-reservations/components/host-reservations-no-results/host-reservations-no-results'
import { HostReservation } from '@/features/host/types/host-reservation'
import { ReservationsList } from '@/features/reservations/reservations-list/reservations-list'

type GuestReservationsProps = {
  reservations: HostReservation[]
}

export async function HostReservationsOverview({
  reservations,
}: GuestReservationsProps): Promise<ReactElement> {
  const tHostReservations = await getTranslations('host.reservations')
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
      {!reservations?.length && <HostReservationsNoResults />}

      <ReservationsList
        heading={tHostReservations('confirmedHeading')}
        items={confirmedReservations}
        urlBasePath="/host/reservations"
      />

      <ReservationsList
        heading={tHostReservations('pendingHeading')}
        items={pendingReservations}
        urlBasePath="/host/reservations"
      />

      <ReservationsList
        heading={tHostReservations('cancelledHeading')}
        items={cancelledReservations}
        urlBasePath="/host/reservations"
      />
    </FlexBox>
  )
}
