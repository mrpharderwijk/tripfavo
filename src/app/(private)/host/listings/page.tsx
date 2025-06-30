import { getTranslations } from 'next-intl/server'
import { ReactElement } from 'react'

import { AppShell } from '@/components/molecules/layout/app-shell/app-shell'
import { HostMainMenuBody } from '@/features/host/components/host-main-menu/host-main-menu-body'
import { HostSidebar } from '@/features/host/components/host-sidebar/host-sidebar'
import { HostListingsPage } from '@/features/host/listings/host-listings/host-listings.page'
import { NavBar } from '@/features/nav-bar/nav-bar'

export default async function HostListingsNextPage(): Promise<ReactElement> {
  const tHost = await getTranslations('host')

  return (
    <AppShell
      navbar={<NavBar body={<HostMainMenuBody />} fixed={false} />}
      sidebar={<HostSidebar heading={tHost('heading')} />}
    >
      <HostListingsPage />
    </AppShell>
  )
}
