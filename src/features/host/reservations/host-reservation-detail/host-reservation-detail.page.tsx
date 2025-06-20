import { ReactElement } from 'react'

import { Divider } from '@/components/atoms/layout/divider/divider'
import { AppShellBody } from '@/components/molecules/layout/app-shell/app-shell-body'
import { HostReservationDetailListing } from '@/features/host/reservations/host-reservation-detail/components/host-reservation-detail-listing/host-reservation-detail-listing'
import { HostReservationDetailPriceBreakdown } from '@/features/host/reservations/host-reservation-detail/components/host-reservation-detail-price-breakdown/host-reservation-detail-price-breakdown'
import { HostReservationDetailSummary } from '@/features/host/reservations/host-reservation-detail/components/host-reservation-detail-summary/host-reservation-detail-summary'
import { HostReservationDetailContextProvider } from '@/features/host/reservations/host-reservation-detail/providers/host-reservation-detail-context-provider'
import { HostReservation } from '@/features/host/types/host-reservation'

type ReservationDetailPageProps = {
  reservation: HostReservation
}

export default async function HostReservationDetailPage({
  reservation,
}: ReservationDetailPageProps): Promise<ReactElement> {
  return (
    <AppShellBody>
      <HostReservationDetailContextProvider reservation={reservation}>
        <HostReservationDetailListing />
        <Divider />

        <HostReservationDetailSummary />
        <Divider />

        <HostReservationDetailPriceBreakdown />
      </HostReservationDetailContextProvider>
    </AppShellBody>
  )
}
