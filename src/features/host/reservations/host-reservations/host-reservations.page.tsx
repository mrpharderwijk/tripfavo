import { getTranslations } from 'next-intl/server'
import { ReactElement } from 'react'
import { Suspense } from 'react'

import { DotLoader } from '@/components/atoms/dot-loader/dot-loader'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { AppShellBody } from '@/components/molecules/layout/app-shell/app-shell-body'
import { HostReservationsOverview } from '@/features/host/reservations/host-reservations/components/host-reservations-overview/host-reservations-overview'
import { getHostReservations } from '@/features/host/server/actions/get-host-reservations'
import { isActionError } from '@/server/utils/error'

export async function HostReservationsPage(): Promise<ReactElement> {
  const [tHostReservations, hostReservationsResponse] = await Promise.all([
    getTranslations('host.reservations'),
    getHostReservations(),
  ])
  const reservations = isActionError(hostReservationsResponse)
    ? null
    : (hostReservationsResponse?.data ?? null)

  return (
    <AppShellBody>
      <Heading tag="h2" like="h4" color="primary" font-weight="bold">
        {tHostReservations('heading')}
      </Heading>

      <FlexBox flex-direction="col" gap={6}>
        <Suspense fallback={<DotLoader />}>
          <HostReservationsOverview reservations={reservations ?? []} />
        </Suspense>
      </FlexBox>
    </AppShellBody>
  )
}
