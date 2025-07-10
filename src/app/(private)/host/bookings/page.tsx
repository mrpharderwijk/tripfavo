import { getTranslations } from 'next-intl/server'
import { ReactElement } from 'react'

import { AppShell } from '@/components/molecules/layout/app-shell/app-shell'
import { HostBookingsPage } from '@/features/host/bookings/host-bookings/host-bookings.page'
import { HostMainMenuBody } from '@/features/host/components/host-main-menu/host-main-menu-body'
import { HostSidebar } from '@/features/host/components/host-sidebar/host-sidebar'
import { NavBar } from '@/features/nav-bar/nav-bar'

export default async function HostBookingsNextPage(): Promise<ReactElement> {
  const tHost = await getTranslations('host')

  return (
    <AppShell
      navbar={<NavBar body={<HostMainMenuBody />} position="relative" />}
      sidebar={<HostSidebar heading={tHost('heading')} />}
    >
      <HostBookingsPage />
    </AppShell>
  )
}
