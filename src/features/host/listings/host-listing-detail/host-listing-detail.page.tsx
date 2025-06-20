import { ReactElement } from 'react'

import { AppShell } from '@/components/molecules/layout/app-shell/app-shell'
import { AppShellBody } from '@/components/molecules/layout/app-shell/app-shell-body'
import { BackButton } from '@/features/nav-bar/components/back-button/back-button'
import { NavBar } from '@/features/nav-bar/nav-bar'

export function HostListingDetailPage(): ReactElement {
  return (
    <AppShell
      navbar={
        <NavBar narrow fixed={false}>
          <BackButton routePath={`/host/listings`} />
        </NavBar>
      }
    >
      <AppShellBody>HostListingDetailPage</AppShellBody>
    </AppShell>
  )
}
