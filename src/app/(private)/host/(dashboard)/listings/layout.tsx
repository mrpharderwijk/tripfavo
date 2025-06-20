import { useTranslations } from 'next-intl'
import { PropsWithChildren, ReactElement } from 'react'

import { AppShell } from '@/components/molecules/layout/app-shell/app-shell'
import { HostMainMenuBody } from '@/features/host/components/host-main-menu/host-main-menu-body'
import { HostSidebar } from '@/features/host/components/host-sidebar/host-sidebar'
import { NavBar } from '@/features/nav-bar/nav-bar'

export default function RentLayout({
  children,
}: Readonly<PropsWithChildren>): ReactElement {
  const tHost = useTranslations('host')

  return (
    <AppShell
      navbar={<NavBar body={<HostMainMenuBody />} fixed={false} />}
      sidebar={<HostSidebar heading={tHost('heading')} />}
    >
      {children}
    </AppShell>
  )
}
