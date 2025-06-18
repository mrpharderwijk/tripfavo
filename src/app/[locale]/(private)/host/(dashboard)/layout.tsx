import { useTranslations } from 'next-intl'
import { PropsWithChildren, ReactElement } from 'react'

import { AppShell } from '@/components/molecules/layout/app-shell/app-shell'
import { HostMainMenuBody } from '@/features/host/components/host-main-menu/host-main-menu-body'
import { HostSidebar } from '@/features/host/components/host-sidebar/host-sidebar'

export default function RentLayout({
  children,
}: Readonly<PropsWithChildren>): ReactElement {
  const tHost = useTranslations('host')

  return (
    <AppShell
      navBarBody={<HostMainMenuBody />}
      sidebar={<HostSidebar heading={tHost('heading')} />}
    >
      {children}
    </AppShell>
  )
}
