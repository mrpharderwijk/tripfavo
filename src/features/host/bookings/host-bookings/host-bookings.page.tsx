import { getTranslations } from 'next-intl/server'
import { ReactElement } from 'react'
import { Suspense } from 'react'

import { DotLoader } from '@/components/atoms/dot-loader/dot-loader'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { AppShellContainer } from '@/components/molecules/layout/app-shell/app-shell-container'
import { AppShellContainerItem } from '@/components/molecules/layout/app-shell/app-shell-container-item'
import { BookingsContextProvider } from '@/features/bookings/providers/bookings-context-provider'
import { HostBookingsOverview } from '@/features/host/bookings/host-bookings/components/host-bookings-overview/host-bookings-overview'
import { getHostBookings } from '@/features/host/server/actions/get-host-bookings'
import { isActionError } from '@/server/utils/error'

export async function HostBookingsPage(): Promise<ReactElement> {
  const [tHostBookings, hostBookingsResponse] = await Promise.all([
    getTranslations('host.bookings'),
    getHostBookings(),
  ])
  const bookings = isActionError(hostBookingsResponse)
    ? null
    : (hostBookingsResponse?.data ?? null)

  return (
    <AppShellContainer>
      <AppShellContainerItem>
        <Heading tag="h2" like="h4" color="primary" font-weight="bold">
          {tHostBookings('heading')}
        </Heading>
      </AppShellContainerItem>

      <Suspense fallback={<DotLoader />}>
        <BookingsContextProvider bookings={bookings ?? []}>
          <HostBookingsOverview />
        </BookingsContextProvider>
      </Suspense>
    </AppShellContainer>
  )
}
