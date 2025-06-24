import { getTranslations } from 'next-intl/server'
import { PropsWithChildren, ReactElement } from 'react'

import { AppShell } from '@/components/molecules/layout/app-shell/app-shell'
import { AccountSidebar } from '@/features/account-settings/components/account-sidebar/account-sidebar'
import { NavBar } from '@/features/nav-bar/nav-bar'

export default async function DashboardLayout({
  children,
}: Readonly<PropsWithChildren>): Promise<ReactElement> {
  const tAccount = await getTranslations('account')

  return (
    <AppShell
      navbar={<NavBar fixed={false} />}
      sidebar={<AccountSidebar heading={tAccount('heading')} />}
    >
      {children}
    </AppShell>
  )
}
