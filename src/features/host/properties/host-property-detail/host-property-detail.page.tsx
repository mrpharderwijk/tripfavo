import { ReactElement } from 'react'

import { AppShell } from '@/components/molecules/layout/app-shell/app-shell'
import { AppShellBody } from '@/components/molecules/layout/app-shell/app-shell-body'
import { BackButton } from '@/features/nav-bar/components/back-button/back-button'
import { NavBar } from '@/features/nav-bar/nav-bar'

export function HostPropertyDetailPage(): ReactElement {
  return (
    <AppShell
      navbar={
        <NavBar narrow position="relative">
          <BackButton routePath={`/host/properties`} />
        </NavBar>
      }
    >
      <AppShellBody>HostPropertyDetailPage</AppShellBody>
    </AppShell>
  )
}
