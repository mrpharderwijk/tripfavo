import { notFound } from 'next/navigation'
import { ReactElement } from 'react'

import { AppShell } from '@/components/molecules/layout/app-shell/app-shell'
import HostReservationDetailPage from '@/features/host/reservations/host-reservation-detail/host-reservation-detail.page'
import { getHostReservationDetail } from '@/features/host/server/actions/get-host-reservations'
import { BackButton } from '@/features/nav-bar/components/back-button/back-button'
import { NavBar } from '@/features/nav-bar/nav-bar'
import { isActionError } from '@/server/utils/error'
import { WithParams } from '@/types/with-params'

type ReservationDetailNextPageProps = WithParams

export default async function HostReservationDetailNextPage({
  params,
}: ReservationDetailNextPageProps): Promise<ReactElement> {
  const { reservationId } = await params
  const hostReservationResponse = await getHostReservationDetail(
    reservationId as string,
  )
  const hostReservation = isActionError(hostReservationResponse)
    ? null
    : hostReservationResponse?.data

  if (!hostReservation) {
    notFound()
  }

  return (
    <AppShell
      navbar={
        <NavBar narrow fixed={false}>
          <BackButton routePath={`/host/reservations`} />
        </NavBar>
      }
    >
      <HostReservationDetailPage reservation={hostReservation ?? null} />
    </AppShell>
  )
}
